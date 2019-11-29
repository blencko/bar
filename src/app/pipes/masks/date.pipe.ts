import { Pipe, PipeTransform } from '@angular/core';
declare var moment: any;

/**
 * Recebe um valor e retorna o valor mascarado de acordo com o formato definido. Por padrão, utiliza-se o formato 'DD/MM/YYYY'.
 */
@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, format?: string, origin?: string, addDays?: boolean): string {

    // tslint:disable-next-line:variable-name
    const format_inputs = origin ? ['x', moment.ISO_8601, origin] : ['x', moment.ISO_8601];
    if (value) {
      // tslint:disable-next-line:max-line-length
      const rawValue = addDays ? moment(value, format_inputs).add(1, 'days').format(format || 'DD/MM/YYYY') : moment(value, format_inputs).format(format || 'DD/MM/YYYY');
      return rawValue;
    } else {
      return '-';
    }
  }

}
