import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatarDataApiService {

  constructor() { }

  formatarData(data: Date): string {
    const year = data.getFullYear();
    const month = data.getMonth() + 1;
    const day = data.getDate();
    return `${year}-${this.adicionarZeroEsquerda(month)}-${this.adicionarZeroEsquerda(day)}`;
  }

  adicionarZeroEsquerda(numero: number): string {
    return numero < 10 ? `0${numero}` : numero.toString();
  }
}
