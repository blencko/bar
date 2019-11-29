import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-actions-cessao-table',
  template: `
    <button *ngIf="rowData.IdStatusCessao === 1" (click)="onClick('edit')" class="btn btn-link"><i class="fa fa-chevron-right"></i></button>
  `,
})
export class ActionsCessaoTableComponent implements OnInit, ViewCell {

  show: false;
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() action: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.rowData;
  }


  onClick(event) {
    this.show = false;

    const data = {
      action: event,
      item: this.renderValue
    };

    this.action.emit(data);
  }



}
