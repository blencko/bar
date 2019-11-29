import { Pipe, PipeTransform } from '@angular/core';

/**
 *  Recebe um valor, do tipo string ou number, e retorna, o valor mascarado no formato 999.999.999,99,
 *  com a possibilidade de símbolo monetário ou não, por padrão o símbolo já é retornado.
 */
@Pipe({
    name: 'currencyTotal'
})
export class CurrencyTotalPipe implements PipeTransform {
    /**
     *  Recebe um valor, do tipo string ou number, e retorna, o valor mascarado no formato 999.999.999,99,
     *  com a possibilidade de símbolo monetário ou não, por padrão o símbolo já é retornado.
     * @param {any} value - Valor para ser mascarado.
     * @param {boolean} supress_simbol - true para suprimir o simbolo
     */
    transform(value: any, supress_simbol?: boolean, type?): string {
        if (value == null) {
            return '-';
        }

        if (typeof value === 'string') {
            value = value.replace(/\D/g, '');
        }

        if (typeof value !== 'number') {
            value = Number(value);
        }

        const rawValue = String(value.toFixed(2));

        if (type === 'percent') {
            console.log(value);
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:radix
            return (parseInt(value) / 100).toFixed(2);
        } else {
            // tslint:disable-next-line:radix
            const val = (value < 0 ? '- ' : '') + (parseInt(rawValue.replace(/[^0-9]/g, '')) / 100).toLocaleString('de-DE', {
                minimumFractionDigits: 2
            });
            // console.log('-----------');
            // console.log(value.toFixed(2));
            // console.log(rawValue);
            // console.log('-----------');
            return val;
        }

    }

}
