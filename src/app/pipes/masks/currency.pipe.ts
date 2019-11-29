import { Pipe, PipeTransform } from '@angular/core';

/**
 *  Recebe um valor, do tipo string ou number, e retorna, o valor mascarado no formato 999.999.999,99,
 *  com a possibilidade de símbolo monetário ou não, por padrão o símbolo já é retornado.
 */
@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  /**  
   *  Recebe um valor, do tipo string ou number, e retorna, o valor mascarado no formato 999.999.999,99,
   *  com a possibilidade de símbolo monetário ou não, por padrão o símbolo já é retornado.
   * @param {any} value - Valor para ser mascarado.
   * @param {boolean} supress_simbol - true para suprimir o simbolo
   */
  transform(value: any, supress_simbol?: boolean): string {
    if (value == null) {
      return '-';
    }

    if (typeof value === 'string') {
      if (value.includes('R$ ')) {
        value = value.replace('R$ ', '');
      }

      value = value.replace(',', '.');
    }
    if (typeof value !== 'number') {
      value = Number(value);
    }

    const rawValue = String(value.toFixed(2)).replace(/\D/g, '');

    // tslint:disable-next-line:radix
    // tslint:disable-next-line:max-line-length
    return (supress_simbol ? '' : 'R$ ') + (value < 0 ? '- ' : '') + (
      // tslint:disable-next-line:radix
      parseInt(rawValue.replace(/[^0-9]/g, '')) / 100
    ).toLocaleString('de-DE', {
      minimumFractionDigits: 2
    });
  }

}
