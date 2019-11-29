import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { environment } from 'src/environments/environment.hmr';
import { orderBy } from 'src/app/util/order';
import { DatePipe } from 'src/app/pipes/masks/date.pipe';
import { CurrencyTotalPipe } from 'src/app/pipes/masks/currencyTotal.pipe';
import * as moment from 'moment';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [CurrencyTotalPipe, DatePipe]
})
export class ReportsComponent implements OnInit {

  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementId: 'table-reports', // the id of html/table element
  };

  exportAsConfigTitulos: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementId: 'table-reports-titulos', // the id of html/table element
  };

  loginRequest = false;

  data = [
    {
      label: 'FILA DE LIQUIDAÇÃO',
      number: 0,
      active: true
    },
    {
      label: 'RESERVADAS',
      number: 0,
      active: false
    }
  ];

  locale = {};

  settingsCessoes = {};
  cessoes = [];
  cessoesBkp = [];

  settingsTitulos = {};
  titulos = [];
  titulosBkp = [];

  // tslint:disable-next-line:variable-name
  status_cessao: Array<any> = [];

  selectedItemCessao = '';
  token: any;

  constructor(
    private requestCtrl: RequestsService,
    private currency: CurrencyTotalPipe,
    private date: DatePipe,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit() {
    this.settingsCessoes = {
      columns: {
        IdCessao: {
          title: 'ID',
          editable: false,
          filter: false,
        },
        QtdeTitulos: {
          title: 'QTDE DE BOLETOS',
          editable: false,
          filter: false,
        },
        cessionario: {
          title: 'QTDE DE CESSIONÁRIOS',
          editable: false,
          filter: false,
          valuePrepareFunction: (value, row) => row.cessionarios.length
        },
        IdModalidade: {
          title: 'MODALIDADE',
          editable: false,
          filter: false,
        },
        IdTipoRegraRateio: {
          title: 'REGRA DE RATEIO',
          editable: false,
          filter: false,
          valuePrepareFunction: (value) => {
            switch (value) {
              case '1':
                return 'Percentual';
              case '2':
                return 'Valor fixo';
            }
          }
        },
        IdStatusCessao: {
          title: 'SITUAÇÃO CESSÃO',
          editable: false,
          type: 'html',
          filter: false,
          valuePrepareFunction: (value) => {
            switch (value) {
              case 1:
                return `<span class="gray">Incompleta</span>`;
              case 2:
                return `<span class="yellow">Reservada</span>`;
              case 3:
                return `<span class="black">Aprovada/Fila de Liquidação</span>`;
              case 4:
                return `<span class="blue">Parcialmente Liquidada</span>`;
              case 5:
                return `<span class="green">Totalmente Liquidade</span>`;
            }
          }
        }
      },
      actions: false
    };

    this.settingsTitulos = {
      columns: {
        NOSSONUMERO: {
          title: 'ID',
          editable: false,
          filter: false,
        },
        VLRREGISTROCONTABIL: {
          title: 'VALOR',
          editable: false,
          filter: false,
          valuePrepareFunction: (value, row) => {
            return `R$ ${this.currency.transform(value)}`;
          }
        },
        DATAVENCIMENTO: {
          title: 'DATA VENCIMENTO',
          editable: false,
          filter: false,
          valuePrepareFunction: (value, row) => {
            return this.date.transform(value);
          }
        }
      },
      actions: false
    };

    this.requestCtrl.token.subscribe(token => {
      if (token) {
        this.token = token;
        this.loginRequest = true;
        this.getCessoes(token);
        this.getTitulos(token);
        this.getSituations(token);

        setTimeout(() => {
          this.loginRequest = false;
        }, 2500);
      }
    });

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

  filterDate(event) {

    const datepick = {
      start: new Date(moment(event.start).format()).getTime(),
      end: new Date(moment(event.end).format()).getTime()
    };

    // tslint:disable-next-line:max-line-length
    // this.boletos = orderBy(this.boletos.filter(boleto => boleto.DATAEMISSAO >= datepick.start && boleto.DATAEMISSAO <= datepick.end), { a: 'DATAEMISSAO', b: 'DATAEMISSAO' });

  }

  filterStatus(status) {

    this.cessoes = this.cessoesBkp;

    if (status) {
      const filter = this.cessoes.filter(res => res.IdStatusCessao === Number(status));
      this.cessoes = filter;
    }
  }



  export(type) {

    const option = type === 'titulos' ? this.exportAsConfigTitulos : this.exportAsConfig;
    // download the file using old school javascript method
    this.exportAsService.save(option, `relatorio_de_${type}`).subscribe((res) => {
      // save started
    });
  }

  getTitulos(token) {
    this.requestCtrl.get(`/cessoes/titulos/cedente/${environment.api.user.codCliente}`, token)
      .then(res => {
        if (res && res.length > 0) {
          const titulos = orderBy(res, { a: 'DATAEMISSAO', b: 'DATAEMISSAO' });
          this.titulos = titulos;
          this.titulosBkp = titulos;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getCessoes(token) {
    this.requestCtrl.get(`/cedentes/${environment.api.user.codCliente}/cessoes`, token)
      .then(res => {
        const filter = res
          .filter(item => item.cessao_full)
          .map(item => JSON.parse(item.cessao_full));

        this.cessoes = filter;
        this.cessoesBkp = filter;
      })
      .catch(error => {
        console.error(error);
      });
  }

  getSituations(token) {
    this.requestCtrl.get('/cessoes/situacoes', token)
      .then(res => {
        if (typeof res !== 'string' && res && res.length > 0) {
          this.status_cessao = res;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

}
