import { Pipe, PipeTransform } from '@angular/core';
/**
 * Recebe um valor e retorna o valor mascarado de acordo com o formato definido.Com a possibilidade de mascaramento inverso.
 */
@Pipe({
  name: 'customFormat'
})
export class CustomFormatPipe implements PipeTransform {
  /**
   * Recebe um valor e retorna o valor mascarado de acordo com o formato definido. Com a possibilidade de mascaramento inverso.
   * @param {string} value - Número do documento como string.
   * @param {string} format - Formato desejado, por exemplo 'aaa-aaa', '9999.9.9-9', serão desprezados os caracteres dígitos e letras,
   *                          e mantidos apenas os caracteres especiais na posição determinada.
   * @param {boolean} reverse - Flag para preenchimento da máscara do fim ao início. Por padrão é definida false.
   */
  transform(value: string, format: any, reverse?: boolean): string {

    switch (format) {
      case 'date':
        format = '99/99/9999'
        break;
      case 'time':
        format = '99:99:99'
        break;
      case 'date_time':
        format = '99/99/9999 99:99:99'
        break;
      case 'cep':
        format = '99999-999'
        break;
      case 'currency':
        format = '999.999.999,99'
        break;
      case 'milhar':
        format = '999.999.999.999'
        break;
      case 'phone':
        format = '9999-9999'
        break;
      case 'cellphone':
        format = '99999-9999'
        break;
      case 'phone_with_ddd':
        format = '(99) 9999-9999'
        break;
      case 'cellphone_with_ddd':
        format = '(99) 99999-9999'
        break;
      case 'cpf':
        format = '999.999.999-99'
        break;
      case 'cnpj':
        format = '99.999.999/9999-99'
        break;
      case 'bank-account':
        format = '99.999-9'
        break;
      case 'agency':
        format = '999999-9'
        break;
      case 'numProcesso':
        format = '999999'
        break;
      case 'numRecibo':
        format = '9999999'
        break;
      case 'ano':
        format = '9999'
        break;
      default:
        format = format;
        break;
    };
    if (reverse) {
      value = String(value).split("").reverse().join("").trim();
      format = String(format).split("").reverse().join("").trim();
    }

    if (value) {
      let regex = /[\w\*]/g;
      value = value.match(regex).join('');
      let rawValue = '';
      regex = /\w/;

      let i = 0;
      value = value.trim();
      for (let c in format) {
        if ((c < (format.length)) && value[i])
          if (regex.test(format[c])) {
            rawValue += value[i]
            i++;
          } else {
            rawValue += format[c];
          }
      }
      if (reverse) {
        rawValue = rawValue.split("").reverse().join("").trim();
      }
      return rawValue;
    } else {
      return '-';
    }
  }

}
