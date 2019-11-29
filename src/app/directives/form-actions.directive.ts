import { Directive, ElementRef, Renderer, OnInit, HostListener, Input } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[appFormActions]'
})
export class FormActionsDirective {
  @Input() password: boolean;
  constructor(
    private el: ElementRef,
    private render: Renderer
  ) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.showPassword();
    const element = this.el.nativeElement;
    const parent = this.el.nativeElement.parentNode;

    if (element.value) {
      this.render.setElementClass(parent, 'active', true);
    } else {
      this.render.setElementClass(parent, 'active', false);
    }
  }

  @HostListener('focus', ['$event'])
  onFocus(e) {
    // run when user clicked in the editable field / is focus.
    const parent = this.el.nativeElement.parentNode;
    const element = this.el.nativeElement;
    if (element.value) {
      this.render.setElementClass(parent, 'active', true);
    } else {
      this.render.setElementClass(parent, 'active', false);
    }
  }

  @HostListener('ngModelChange', ['$event'])
  onChange(e) {
    const element = this.el.nativeElement.parentNode;
    if (e) {
      // run when user clicked outside the field.
      this.render.setElementClass(element, 'active', true);
    } else {
      this.render.setElementClass(element, 'active', false);
    }

    if (this.password) {
      const elementPassword = this.el.nativeElement.nextSibling;
      if (e) {
        this.render.setElementClass(elementPassword, 'active', true);
      } else {
        this.render.setElementClass(elementPassword, 'active', false);
      }
    }
  }


  showPassword() {
    if (this.password) {
      $('.show-password').click(function () {
        const hasclass = $(this).hasClass('show');

        if (hasclass) {
          $('.show-password').removeClass('show');
          $('.show-password').addClass('no-show');
          $('.show-password').siblings('.input-control').attr('type', 'text');
        } else {
          $('.show-password').addClass('show');
          $('.show-password').removeClass('no-show');
          $('.show-password').siblings('.input-control').attr('type', 'password');
        }
      });
    }
  }

}
