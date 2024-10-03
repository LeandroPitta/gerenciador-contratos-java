import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContratoService } from '../../services/contrato.service';
import { Contrato } from '../../models/contrato';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent {
  isLoading = false;
  contratoEncontrado: Contrato | null = null;
  numeroContrato: number | null = null;

  constructor(
    private contratoService: ContratoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  pesquisarContrato() {
    if (this.numeroContrato === null) {
      this.snackBar.open('Por favor, insira o número do contrato', 'Fechar', {
        duration: 5000
      });
      return;
    }

    this.isLoading = true;

    this.contratoService.getContratoById(this.numeroContrato).subscribe(response => {
      this.contratoEncontrado = response;
      this.isLoading = false;

      if (this.contratoEncontrado) {
        this.router.navigate(['manutencao'], {
          state: {
            contratoEncontrado: this.contratoEncontrado
          },
        });
      } else {
        this.snackBar.open('Contrato não encontrado', 'Fechar', {
          duration: 5000
        });
      }
    }, error => {
      this.isLoading = false;
      this.snackBar.open('Erro ao buscar contrato', 'Fechar', {
        duration: 5000
      });
      console.error('Error fetching data:', error);
    });
  }
}
