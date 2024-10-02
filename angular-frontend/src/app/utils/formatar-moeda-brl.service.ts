import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class FormatarMoedaBrl {

    formatarValor(input: HTMLInputElement): void {
        const valor = input.value.replace(/\D/g, '');
        const valorFormatado = (Number(valor) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        input.value = valorFormatado;
    }

    formatarParaValorMonetario(valor: number): string {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}