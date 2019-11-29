import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() inf: any;
  @Input() name: any;

  date: any = `${moment().format('dddd')}, ${moment().format('LL')}`;

  constructor() { }

  ngOnInit() {
    if (this.name) {
      this.name = this.name.split(' ')[0];
    }
  }

}
