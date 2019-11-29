import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeDoc'
})
export class TypeDocPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'IDENTIFICACAO':
        return 'RG, CPF ou CNH (de um dos sócios)';
      case 'COMPROVANTE_RESIDENCIA':
        return 'Comprovante de residência';
      case 'COMPROVANTE_ATIVIDADE':
        return 'Comprovante de atividade';
      case 'CARTAO_CNPJ':
        return 'Cartão CNPJ';
    }
  }

}
