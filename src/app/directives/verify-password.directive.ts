import { Directive, Input, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appVerifyPassword]'
})
export class VerifyPasswordDirective {

  @Input() CorrectyPassword;
  @Output() updateValueForm = new EventEmitter();
  private formStatus: any;

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('keyup', ['$event'])
  onkeyup(e) {
    // run when user clicked in the editable field / is focus.
    const element = this.el.nativeElement;
    if (e.target.value === this.CorrectyPassword) {
      this.formStatus = true;
    } else {
      this.formStatus = false;
      element.classList.add('invalid-input');
    }
    this.updateValueForm.emit(this.formStatus);
  }

}
