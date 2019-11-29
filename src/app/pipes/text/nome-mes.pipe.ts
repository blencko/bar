import { Pipe, PipeTransform } from '@angular/core';

declare var moment: any;
/**
 * Recebe um valor referente a um mês e retorna o nome extenso do mês em questão.   
 */
@Pipe({
  name: 'nomeMes'
})
export class NomeMesPipe implements PipeTransform {
  /**
   * Recebe um valor referente a um mês e retorna o nome extenso do mês em questão.   
   * @param {string} value - Mês definido nos formatos a seguir [1, '1', 'Jan', 'Janeiro']
   */
  transform(value: any): string {
    return moment(value, ['M', 'MM', 'MMM', 'MMMM']).format('MMMM');
  }

}
