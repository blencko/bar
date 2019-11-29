import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cards'
})
export class CardsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const trim = value.replace(/ /g, '').toLowerCase();
      return '../../../../assets/images/cards/' + trim + '.png';
    }
  }

}
