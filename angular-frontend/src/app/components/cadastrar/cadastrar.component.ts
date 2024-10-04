import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormatarMoedaBrl } from '../../utils/formatar-moeda-brl.service';
import { ValidacaoService } from '../../utils/validacao.service';
import { Router } from '@angular/router';
import { FormatarDataApiService } from 'src/app/utils/formatar-data-api.service';
import { ContratoService } from '../../services/contrato.service';
import { ContratoUpdateRequest } from 'src/app/models/contrato-update-request';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})

export class CadastrarComponent implements OnInit {
  contrato!: string;
  nome!: string;
  valorContrato!: string;
  dataContrato!: Date;
  maxDate: Date = new Date();

  constructor(
    private contratoService: ContratoService,
    private snackBar: MatSnackBar,
    public FormatarMoedaBrl: FormatarMoedaBrl,
    private validacaoService: ValidacaoService,
    private router: Router,
    private FormatarDataApiService: FormatarDataApiService
  ) {}

  ngOnInit() {
    this.gerarNumeroContrato();
  }

  gerarNumeroContrato() {
    this.contratoService.gerarNumeroContrato().subscribe(
      response => {
        this.contrato = response.numeroContrato;
      },
      error => {
        console.error('Erro ao gerar número do contrato', error);
        this.snackBar.open('Erro ao gerar número do contrato', 'Fechar', {
          duration: 5000
        });
      }
    );
  }

  cadastrarContrato() {
    if (!this.validacaoService.validarDados(
      this.contrato,
      this.nome,
      this.valorContrato,
      this.dataContrato
    )) {
      this.snackBar.open('Dados inválidos. Verifique os campos obrigatórios.', 'Fechar', {
        duration: 5000
      });
      return;
    }

    const valorSemFormatacao = this.valorContrato.replace(/[^\d]/g, '');
    const valorFloat = parseFloat(valorSemFormatacao.slice(0, -2) + '.' + valorSemFormatacao.slice(-2));

    const body: ContratoUpdateRequest = {
      nome: this.nome,
      valor: valorFloat,
      dataContrato: this.FormatarDataApiService.formatarData(this.dataContrato)
    };

    this.contratoService.cadastrarContrato(body).subscribe(
      response => {
        this.snackBar.open('Contrato ' + this.contrato + ' cadastrado com sucesso', 'Fechar', {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cadastrar']);
        });
      },
      error => {
        console.error('Erro ao cadastrar contrato', error);
        this.snackBar.open('Erro ao cadastrar contrato', 'Fechar', {
          duration: 5000
        });
      }
    );
  }
}
