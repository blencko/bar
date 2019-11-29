import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-liquidation',
  templateUrl: './liquidation.component.html',
  styleUrls: ['./liquidation.component.scss']
})

export class LiquidationComponent implements OnInit {

  settings = {};
  items = [];
  itemsFilter = [];
  locale = {};



  constructor() { }

  ngOnInit() {

    this.settings = {
      columns: {
        data: {
          title: 'DATA DE VENCIMENTO',
          editable: false,
          filter: false,
        },
        data_de_vencimento: {
          title: 'DATA DE LIQUIDACAO',
          editable: false,
          filter: false,
        },
        banco: {
          title: 'BANCO',
          editable: false,
          filter: false,
        },
        agencia: {
          title: 'AG',
          editable: false,
          filter: false,
        },
        conta: {
          title: 'CONTA',
          editable: false,
          filter: false,
        },
        valor: {
          title: 'VALOR',
          editable: false,
          filter: false,
        },
        situacao: {
          title: 'SITUAÇÃO',
          editable: false,
          filter: false,
        },
        cedente: {
          title: 'CEDENTE',
          editable: false,
          filter: false,
        },
        pagador: {
          title: 'PAGADOR',
          editable: false,
          filter: false,
        }
      },
      actions: false
    };

    moment.locale('pt-br');

    this.locale = {
      format: 'DD/MM/YYYY',
      separator: ' - ',
      cancelLabel: 'Cancelar',
      applyLabel: 'Ok',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek()
    };
  }


  orderBy(array) {
    return array.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
  }
 
  
  filterName(event) {
    const value = event.target.value;
    this.items = this.orderBy(this.itemsFilter);
  
    if (value) {
      const filter = this.items.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
      this.items = this.orderBy(filter);
    }
  }

  filterDate(event) {

    const datepick = {
      start: new Date(moment(event.start).format()).getTime(),
      end: new Date(moment(event.end).format()).getTime()
    };

    // tslint:disable-next-line:max-line-length
    // this.boletos = orderBy(this.boletos.filter(boleto => boleto.DATAEMISSAO >= datepick.start && boleto.DATAEMISSAO <= datepick.end), { a: 'DATAEMISSAO', b: 'DATAEMISSAO' });

  }








}
