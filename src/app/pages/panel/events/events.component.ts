import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  settings = {}
  items = [];
  locale = {};

  constructor() { }

  ngOnInit() {
    this.settings = {
      columns: {
        data: {
          title: 'DATA',
          editable: false,
          filter: false,
        },
        banco: {
          title: 'EVENTO',
          editable: false,
          filter: false,
        },
        agencia: {
          title: 'DESCRIÇÃO',
          editable: false,
          filter: false,
        },
        conta: {
          title: 'CEDENTE',
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


  async filterDate(event) {
    console.log(event);
  }


}
