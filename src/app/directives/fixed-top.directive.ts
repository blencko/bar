import { Directive, ElementRef, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFixedTop]'
})
export class FixedTopDirective implements OnInit {

  @Input() elementRef: any;
  @Input() offset: any;

  constructor(
    private element: ElementRef
  ) { }

  ngOnInit(): void {

  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(event: UIEvent) {
  //   const element = this.element.nativeElement;
  //   if (element.offsetParent && element.offsetParent.clientHeight) {
  //     const elementHeight = this.elementRef ? this.elementRef.offsetHeight : element.offsetParent.clientHeight;
  //     const bodyHeight = document.querySelector('body').offsetHeight;
      // tslint:disable-next-line:max-line-length
  //     const elementScrollTop = this.offset && this.offset > 0 ? ((bodyHeight - elementHeight) - this.offset) : bodyHeight - elementHeight;


  //     if (event.srcElement['scrollingElement'].scrollTop >= elementScrollTop) {
  //       element.classList.add('fixed');
  //       console.log(element.classList);
  //     } else {
  //       console.log('saí');
  //       element.classList.remove('fixed');
  //     }
  //   } else {
  //     element.classList.remove('fixed');
  //   }
  // }

}
