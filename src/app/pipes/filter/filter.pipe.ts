import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], prop: string, value: any, strict: boolean, includes: boolean): any {

    if (!array) {
      return [];
    }

    if (!value) {
      if (!strict) {
        return array;
      } else {
        return array.filter(a => a[prop]);
      }
    }



    if (prop.includes('.')) {
      let split = prop.split('.');

      return array.filter(a => {
        let target = a;

        for (const s of split) {
          if (!target[s]) {
            return false;
          }

          if (split.indexOf(s) === (split.length - 1)) {

            return target[s] === value;
          } else {
            target = target[s];
          }
        }
      });
    } else {
      if (array.length) {
        return array.filter(c => {


          if (c[prop]) {
            if (includes) {
              return c[prop].includes(value);
            } else {
              return c[prop] === value;
            }
          }

        });
      } else {
        return [];
      }
    }
  }

}
