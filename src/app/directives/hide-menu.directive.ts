import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHideMenu]'
})
export class HideMenuDirective {

  @Input() menu: any;

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const classContains = this.menu.classList.contains('mini-sidebar');
    if (classContains) {
      this.menu.classList.remove('mini-sidebar');
    } else {
      this.menu.classList.add('mini-sidebar');
    }
  }

}
