import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { environment } from 'src/environments/environment.hmr';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.sass']
})
export class PanelComponent implements OnInit {
  title = 'banco-arbi-cedente';
  user: any;
  menu: NbMenuItem[] = [];

  date: any = moment().format('DD.MM.YYYY');

  constructor(
    private sidebarService: NbSidebarService
  ) { }

  ngOnInit() {
    if (environment.api.user) {
      this.user = environment.api.user;

      let menu = [
        {
          title: 'Home',
          link: '/painel/dashboard',
          icon: 'icon-home',
          home: true,
          selected: true
        },
        {
          title: 'Cessionário',
          link: '/painel/cessionarios',
          icon: 'icon-users'
        },
        {
          title: 'Cessão de Títulos',
          link: '/painel/cessao-de-titulos',
          icon: 'icon-currency'
        },
        {
          title: 'Relatórios',
          link: '/painel/relatorios',
          icon: 'icon-reports'
        }
      ];

      if (this.user.cessionario && !this.user.cedente) {
        menu = [
          {
            title: 'Home',
            link: '/painel/dashboard',
            icon: 'icon-home',
            home: true,
            selected: true
          },
          {
            title: 'Liquidações',
            link: '/painel/liquidacoes',
            icon: 'icon-liquidation'
          },
          {
            title: 'Histórico de Eventos',
            link: '/painel/eventos',
            icon: 'icon-event'
          }
        ]
      }

      this.menu = menu;
    }
  }


  filterName(name) {
    const split = name.split(' ');
    const rename = `${split[0]} ${split[1]}`;
    if (rename.length < 10) {
      return `${split[0]} ${split[1]}`;
    } else {
      return `${split[0]}`;
    }
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  toggleMobile() {
    this.sidebarService.toggle(true);
    return false;
  }

}
