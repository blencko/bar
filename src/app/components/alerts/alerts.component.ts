import { Component, OnInit, Input } from '@angular/core';


interface Settings {
  title: string,
  mensage: string,
  type: string,
  actions: object,
  icon: boolean,
  iconCss: string
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.sass']
})


export class AlertsComponent implements OnInit {

  @Input() settings: Settings;

  constructor() { }

  ngOnInit() {

  }
  

}
