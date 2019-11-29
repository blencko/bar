import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appCloneGroup]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(click)': 'cloneForm()'
  }
})
export class CloneGroupDirective {

  @Input('cloneElement') cloneElement: HTMLElement;

  constructor() { }

  cloneForm() {
    const clone = this.cloneElement.cloneNode(true);
    document.getElementById('colab-filds').appendChild(clone);
  }

}
