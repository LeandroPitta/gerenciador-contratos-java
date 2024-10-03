import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormatarMoedaBrl } from '../../utils/formatar-moeda-brl.service';
import { ValidacaoService } from '../../utils/validacao.service';
import { FormatarDataApiService } from 'src/app/utils/formatar-data-api.service';
import { Contrato } from 'src/app/models/contrato';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})

export class ManutencaoComponent implements OnInit {

  contrato!: string;
  nome!: string;
  valorContrato!: string;
  dataContrato!: Date;
  contratoEncontrado: Contrato | null = null;
  maxDate: Date = new Date();

  constructor(
    public router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public FormatarMoedaBrl: FormatarMoedaBrl,
    private validacaoService: ValidacaoService,
    private FormatarDataApiService: FormatarDataApiService
  ) { }

  ngOnInit() {
    this.contratoEncontrado = history.state.contratoEncontrado;
    if (this.contratoEncontrado) {
      this.contrato = this.contratoEncontrado.contrato;
      this.nome = this.contratoEncontrado.nome;
      this.valorContrato = this.FormatarMoedaBrl.formatarParaValorMonetario(this.contratoEncontrado.valor);
      this.dataContrato = new Date(this.contratoEncontrado.dataContrato);
      this.dataContrato.setMinutes(this.dataContrato.getMinutes() + this.dataContrato.getTimezoneOffset());
    }
  }

  atualizarContrato() {
    // Verificar se os dados são válidos
    if (!this.validacaoService.validarDados(
      this.contrato,
      this.nome,
      this.valorContrato,
      this.dataContrato
    )) {
      this.snackBar.open('Dados inválidos. Verifique os campos obrigatórios.', 'Fechar', {
        duration: 5000
      });
      return; // Se os dados não forem válidos, exibir mensagem de erro e sair do método
    }
    const valorSemFormatacao = this.valorContrato.replace(/[^\d]/g, '');
    const valorFloat = valorSemFormatacao.slice(0, -2) + '.' + valorSemFormatacao.slice(-2);

    const body = new HttpParams()
      .set('CONTRATO', this.contrato.toString())
      .set('NOME', this.nome)
      .set('VALOR', valorFloat)
      .set('DATA_DO_CONTRATO', this.FormatarDataApiService.formatarData(this.dataContrato));

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://localhost:8080/api/manutencao.asp', body.toString(), { headers }).subscribe(
      (response: any) => {
        this.snackBar.open('Contrato ' + this.contrato + ' atualizado com sucesso', 'Fechar', {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.router.navigate(['/pesquisar']);
      },
      (error: any) => {
        console.error('Erro ao atualizar contrato', error);
        // Lógica de tratamento de erro, se necessário
      }
    );
  }
}
