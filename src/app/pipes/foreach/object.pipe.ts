import { Pipe, PipeTransform } from "@angular/core";
declare var moment: any;
/**
 * Recebe um array de entrada e retorna o valor ordenado de acordo com a propriedade do objetos contidos no objeto
 */
 
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value) : any {
    if(!value) {
      return null;
    }
    return Object.keys(value);
  }
}