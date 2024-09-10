import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class ValidacaoService {
    validarDados(
        contrato: number | null,
        nome: string,
        valorContrato: string,
        dataContrato: Date | null
    ): boolean {
        const contratoValido = /^\d{9}$/.test(contrato?.toString() || '');
        const nomeValido = /^[a-zA-ZÀ-ú\s]{3,}$/.test(nome);
        const valorContratoValido = !!valorContrato;
        const dataContratoValida = !!dataContrato;

        return contratoValido && nomeValido && valorContratoValido && dataContratoValida;
    }
}
