import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexo'
})
export class SexoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let sexo = '-';
    if (value) {
      switch (value.toLocaleLowerCase()) {
        case 'f':
        case 'feminino':
          sexo = 'Feminino'
          break;
        case 'm':
        case 'masculino':
          sexo = 'Masculino'
          break;
      }
    }
    return sexo;
  }

}
