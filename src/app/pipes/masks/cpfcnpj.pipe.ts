import { Pipe, PipeTransform } from '@angular/core';

/**
 * Recebe um valor, do tipo string e após desprezo de caracteres não dígitos, retorna o valor mascarado, de acordo com o tamanho da string
 * (11 caracteres: tipo CPF - 999.999.999-99
 * 14 caracteres: tipo CNPJ - 99.999.999/9999-99).
 */
@Pipe({
  name: 'cpfcnpj'
})
export class CpfCnpjPipe implements PipeTransform {
  /**
   * Recebe um valor, do tipo string e após desprezo de caracteres não dígitos,
   *  retorna o valor mascarado, de acordo com o tamanho da string
   * (11 caracteres: tipo CPF - 999.999.999-99
   * 14 caracteres: tipo CNPJ - 99.999.999/9999-99).
   * @param string - Número do documento como string.
   */
  transform(value: string, option?: any): string {
    const regex = /[\w\*]/g;

    if (value) {
      value = typeof value === 'number' ? JSON.stringify(value) : value;
      const rawValue = value.match(regex).join('');
      switch (rawValue.length) {
        case 14:
          // tslint:disable-next-line:max-line-length
          return rawValue.substring(0, 2) + '.' + rawValue.substring(2, 5) + '.' + rawValue.substring(5, 8) + '/' + rawValue.substring(8, 12) + '-' + rawValue.substring(12, 14);
        case 11:
          // tslint:disable-next-line:max-line-length
          return rawValue.substring(0, 3) + '.' + rawValue.substring(3, 6) + '.' + rawValue.substring(6, 9) + '-' + rawValue.substring(9, 11);
        default:
          return 'Informação inválida';
      }
    }
  }

}
