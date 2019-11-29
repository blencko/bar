import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let estado = '-';
    if (value)
      switch (value.toLocaleLowerCase()) {
        case 'acre':
        case 'ac':
          estado = 'Acre';
          break;
        case 'alagoas':
        case 'al':
          estado = 'Alagoas';
          break;
        case 'amapá':
        case 'ap':
          estado = 'Amapá';
          break;
        case 'amazonas':
        case 'am':
          estado = 'Amazonas';
          break;
        case 'bahia':
        case 'ba':
          estado = 'Bahia';
          break;
        case 'ceará':
        case 'ce':
          estado = 'Ceará';
          break;
        case 'Distrito federal':
        case 'df':
          estado = 'Distrito Federal';
          break;
        case 'Espírito santo':
        case 'es':
          estado = 'Espírito Santo';
          break;
        case 'goiás':
        case 'go':
          estado = 'Goiás';
          break;
        case 'maranhão':
        case 'ma':
          estado = 'Maranhão';
          break;
        case 'Mato grosso':
        case 'mt':
          estado = 'Mato Grosso';
          break;
        case 'Mato Grosso do sul':
        case 'ms':
          estado = 'Mato Grosso do Sul';
          break;
        case 'Minas gerais':
        case 'mg':
          estado = 'Minas Gerais';
          break;
        case 'pará':
        case 'pa':
          estado = 'Pará';
          break;
        case 'paraíba':
        case 'pb':
          estado = 'Paraíba';
          break;
        case 'paraná':
        case 'pr':
          estado = 'Paraná';
          break;
        case 'pernambuco':
        case 'pe':
          estado = 'Pernambuco';
          break;
        case 'piauí':
        case 'pi':
          estado = 'Piauí';
          break;
        case 'Rio de janeiro':
        case 'rj':
          estado = 'Rio de Janeiro';
          break;
        case 'Rio Grande do norte':
        case 'rn':
          estado = 'Rio Grande do Norte';
          break;
        case 'Rio Grande do sul':
        case 'rs':
          estado = 'Rio Grande do Sul';
          break;
        case 'rondônia':
        case 'ro':
          estado = 'Rondônia';
          break;
        case 'roraima':
        case 'rr':
          estado = 'Roraima';
          break;
        case 'Santa catarina':
        case 'sc':
          estado = 'Santa Catarina';
          break;
        case 'São paulo':
        case 'sp':
          estado = 'São Paulo';
          break;
        case 'sergipe':
        case 'se':
          estado = 'Sergipe';
          break;
        case 'tocantins':
        case 'to':
          estado = 'Tocantins';
          break;
      }
    return estado;
  }
}
