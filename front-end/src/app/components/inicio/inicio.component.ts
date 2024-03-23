import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormatarMoedaBrl } from '../../services/formatar-moeda-brl.service';

interface Contrato {
  CONTRATO: number;
  NOME: string;
  VALOR: number;
  DATA_DO_CONTRATO: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {

  totalContratos: number = 0;
  valorTotal: number = 0;
  mediaContratos: number = 0;

  constructor(
    private http: HttpClient,
    public FormatarMoedaBrl: FormatarMoedaBrl
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<Contrato[]>('http://localhost:8080/api/tabela.asp').subscribe(data => {
      this.totalContratos = data.length;
      this.valorTotal = data.map(contrato => contrato.VALOR).reduce((total, valor) => total + valor, 0);
      this.mediaContratos = this.valorTotal / this.totalContratos;
    });
  }

}
