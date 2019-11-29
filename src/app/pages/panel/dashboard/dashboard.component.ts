import { Component, AfterViewInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { environment } from 'src/environments/environment.hmr';
import { StatusPedidoPipe } from 'src/app/pipes/masks/status-pedido/status-pedido.pipe';
import { CpfCnpjPipe } from 'src/app/pipes/masks/cpfcnpj.pipe';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  providers: [StatusPedidoPipe, CpfCnpjPipe]
})
export class DashboardComponent implements AfterViewInit {

  data = [
    {
      label: 'Cessões reservadas',
      number: 0,
      active: true
    },
    {
      label: 'Cessões incompletas',
      number: 0,
      active: false
    }
  ];

  // tslint:disable-next-line:variable-name
  data_cessionarios = [
    {
      label: 'ATIVOS',
      number: 0
    },
    {
      label: 'INCOMPLETOS',
      number: 0
    }
  ];

  token: any = '';
  cessionarios: any = [];
  cessoes: any = [];
  totalValue: any = 0;
  activeCalendar: any = 0;

  abertas = [30];
  pagas= [40];
  baixadas = [20];



  events = [
    {
      company: 'Empresa Pag Ltda.',
      msgm: 'Solicitou complementação de seu cadastro'
    },
    {
      company: 'Empresa Pag Ltda.',
      msgm: 'Solicitou complementação de seu cadastro'
    },
    {
      company: 'Empresa Pag Ltda.',
      msgm: 'Solicitou complementação de seu cadastro'
    },
    {
      company: 'Empresa Pag Ltda.',
      msgm: 'Solicitou complementação de seu cadastro'
    },
    {
      company: 'Empresa Pag Ltda.',
      msgm: 'Solicitou complementação de seu cadastro'
    },
    {
      company: 'Empresa Pag Ltda.',
      msgm: 'Solicitou complementação de seu cadastro'
    }
  ];

  user: any = environment.api.user;

  constructor(
    private request: RequestsService,
    private satatusCtrl: StatusPedidoPipe,
    private route: ActivatedRoute,
    private cnpjMask: CpfCnpjPipe
  ) {
    route.queryParamMap.subscribe(queryParams => {
      const token = queryParams.get('access_token');
      if (token) {
        localStorage.setItem('token', token);
        this.auth(token);
      }
    });

  }



  async auth(token) {
    this.request.getExternal(`${environment.api.url_auth}?access_token=${token}`)
      .then(res => {
        let user = {};
        console.log(res);
        if (res && res.message === 'Sucesso') {
          const { data } = res;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data.length; i++) {
            const { cedente } = data[i];
            if (cedente) {
              user = { ...data[i] };
            }
          }

          if (user) {
            // environment.api.user = { ...user };
          } else {
            Swal.fire({
              title: 'Usuário sem permissão.',
              text: 'Usuário não é permitido acessar esse módulo.',
              type: 'warning',
              showCancelButton: false,
              showConfirmButton: false,
              customClass: 'default'
            });
          }

        } else {
          Swal.fire({
            title: 'Erro interno.',
            text: 'Usuário não foi retornado corretamente, entre em contato com o suporte.',
            type: 'error',
            showCancelButton: false,
            showConfirmButton: false,
            customClass: 'default'
          });
        }
      })
      .catch(error => console.error(error));
  }

  // tslint:disable-next-line:variable-name
  next(number: any) {
    this.activeCalendar = number;
  }

  // tslint:disable-next-line:variable-name
  prev(number: any) {
    this.activeCalendar = number;
  }
  ngAfterViewInit() {
    this.request.token.subscribe(token => {
      if (typeof token === 'string') {
        this.token = token;
        this.getCessionarios(token);
        this.getCessoes(token);
      }
    });

  }

  getCessoes(token) {
    const { codCliente } = environment.api.user;
    this.request.get(`/cedentes/${codCliente}/cessoes`, token)
      .then(res => {
        if (typeof res === 'object' && res.length > 0) {
          this.cessoes = res
            .map(item => {
              const response = JSON.parse(item.cessao_full);

              switch (response.IdStatusCessao) {
                case 1:
                  this.data[1].number++;
                  break;
                case 2:
                  this.data[0].number++;
                  break;
              }

              return response;
            })
            .filter(resp => resp.IdStatusCessao === 3);
        }

        this.cessoes.map(resp => {
          this.totalValue += resp.ValorCessao;
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getCessionarios(token) {
    const { codCliente } = environment.api.user;
    this.request.get(`/cedentes/${codCliente}/cessionarios`, token)
      .then(res => {
        if (typeof res === 'object') {
          this.cessionarios = [];

          this.data_cessionarios[1].number = 0;
          this.data_cessionarios[0].number = 0;

          res.map((itm, index) => {
            if (index < 4) {
              this.cessionarios = [
                ...this.cessionarios,
                {
                  documentation: this.cnpjMask.transform(itm.CNPJ),
                  name: itm.Nome,
                  email: itm.Email,
                  situation: this.satatusCtrl.transform(itm.IdStatusCessionario),
                  action: itm.IdStatusCessionario === 0 ? JSON.stringify(itm) : ''
                }
              ];
            }
            if (itm.IdStatusCessionario === 3) {
              this.data_cessionarios[0].number++;
            } else if (itm.IdStatusCessionario === 0) {
              this.data_cessionarios[1].number++;
            }
          });
        }
      });
  }



}







