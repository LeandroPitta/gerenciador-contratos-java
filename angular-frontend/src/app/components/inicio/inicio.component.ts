import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { FormatarMoedaBrl } from '../../utils/formatar-moeda-brl.service';

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
    private contratoService: ContratoService,
    public FormatarMoedaBrl: FormatarMoedaBrl
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.contratoService.getEstatisticas().subscribe(
      data => {
        this.totalContratos = data.quantidadeTotal;
        this.valorTotal = data.valorTotal;
        this.mediaContratos = data.mediaValor;
      },
      error => {
        console.error('Erro ao buscar estatísticas', error);
      }
    );
  }
}
