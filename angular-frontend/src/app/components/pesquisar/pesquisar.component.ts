import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent {
  isLoading = false;
  displayedColumns = ['CONTRATO', 'NOME', 'VALOR', 'DATA_DO_CONTRATO'];
  dataSource: any[] = [];
  contratoEncontrado: any = null;
  numeroContrato: number | null = null;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }


  pesquisarContrato() {
    const apiUrl = 'http://localhost:8080/api/tabela.asp';
    this.isLoading = true;

    this.http.get<any[]>(apiUrl).subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;
      this.contratoEncontrado = this.dataSource.find(c => c.CONTRATO == this.numeroContrato);

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
    });
  }
}
