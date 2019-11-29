import { element } from 'protractor';
import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[appCountAnimation]'
})
export class CountAnimationDirective {

  @Input() value: any;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private element: ElementRef
  ) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.count();
    }, 1500);
  }

  count() {
    const $el = $(this.element.nativeElement);
    console.log(this.value);
    $el.animate({}, {
      duration: 2000,
      step: function (now, fx) {
        alert();
        console.log(now);
        console.log(fx);
      }
    });
  }
}
