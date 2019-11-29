import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-actions-table',
  template: `
    <div class="btn btn-link" *ngIf="renderValue">
      <div [ngClass]="{'active': !show}" class="show-off" (click)="show = true"><i class="fa fa-chevron-right"></i></div>
      <div [ngClass]="{'active': show}" class="show-on">
        <div class="btn-groups">
          <button  (click)="onClick('send')" class="btn btn-default">Cobrar Complemento</button>
        </div>
      </div>
    </div>
    <div *ngIf="show" class="overlay-action" (click)="show = false"></div>
  `,
})
export class ActionsTableComponent implements OnInit, ViewCell {

  show: false;
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() action: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString();
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
