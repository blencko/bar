import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCloseCloneGroup]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(click)': 'closeCloneForm()'
  }
})
export class CloseCloneGroupDirective {

  constructor(
    private element: ElementRef
  ) { }

  @Input('cloneElement') cloneElement: HTMLElement;

  closeCloneForm() {

  }

}
