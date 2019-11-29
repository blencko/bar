import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPedido'
})
export class StatusPedidoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 0:
        return 'Convidado'
      case 1:
        return 'Convite Recusado'
      case 2:
        return 'Cadastro Finalizado'
      case 3:
        return 'Aprovado Backoffice'
    }
  }

}
