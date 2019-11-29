import { Directive, ElementRef, Input, HostListener, SimpleChanges, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '../pipes/masks/date.pipe';
import { CurrencyPipe } from '../pipes/masks/currency.pipe';
import { CurrencyTotalPipe } from '../pipes/masks/currencyTotal.pipe';

declare var $: any;
declare var moment: any;


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[data-mask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MaskDirective,
      multi: true
    },
    DatePipe,
    CurrencyPipe
  ]
})
export class MaskDirective implements ControlValueAccessor {
  constructor(
    private el: ElementRef,
    // tslint:disable-next-line:no-shadowed-variable
    private CurrencyPipe: CurrencyPipe
  ) { }

  elem: any = this.el.nativeElement;


  onTouched: any;
  onChange: any;
  @Input() mask: string;
  @Input() data_mask: any;

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    if (!this.data_mask) {
      this.data_mask = $(this.elem).attr('data-mask');
    }
    this.mask = this.getPattern(null);

  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  writeValue(value: any) {
    if (value) {
      switch (this.data_mask) {
        case 'date':
          this.el.nativeElement.value = moment(value).format('DD/MM/YYYY');
          break;
        case 'currency':
          this.el.nativeElement.value = this.formatCurrency(value);
          break;
        default:
          let valor = String(value).replace(/\D/g, '');
          const pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
          const valorMask = valor + pad.substring(0, pad.length - valor.length);
          let valorMaskPos = 0;
          valor = '';
          for (let i = 0; i < this.mask.length; i++) {
            // tslint:disable-next-line:radix
            if (isNaN(parseInt(this.mask.charAt(i)))) {
              valor += this.mask.charAt(i);
            } else {
              valor += valorMask[valorMaskPos++];
            }
          }

          if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
          }

          this.el.nativeElement.value = valor;
      }
    } else {
      this.el.nativeElement.value = '';
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    this.mask = this.getPattern();


    const valor = $event.target.value.replace(/\D/g, '');

    const pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
    const valorMask = valor + pad.substring(0, pad.length - valor.length);

    if ($event.keyCode === 8) {
      if (this.data_mask === 'currency') {
        this.deleteFunction($event, String(Number($event.target.value.replace(/\D/g, '')) / 100));
      } else {
        this.deleteFunction($event, valor);
      }
      return;
    }
    this.setModelValue($event, valor);

    if (valor.length > pad.length) {
      if (this.data_mask === 'currency') {
        $event.target.value = this.formatCurrency(String(Number(valor.substring(0, pad.length).replace(/\D/g, '')) / 100));
        return;
      }
    }

    if (this.data_mask === 'currency') {
      $event.target.value = this.formatCurrency(String(Number($event.target.value.replace(/\D/g, '')) / 100));
    } else {

      $event.target.value = this.getValueMask(valor);
    }
  }

  getValueMask(valor: any) {

    const pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
    const valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;
    valor = '';
    for (let i = 0; i < this.mask.length; i++) {
      // tslint:disable-next-line:radix
      if (isNaN(parseInt(this.mask.charAt(i)))) {
        valor += this.mask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    return valor;
  }

  getPattern(pattern?: string): string {
    const mask = pattern || this.data_mask;

    switch (mask) {
      case 'date':
        return '99/99/9999';
      case 'time':
        return '99:99';
      case 'date_time':
        return '99/99/9999 99:99:99';
      case 'cep':
        return '99999-999';
      case 'currency':
        return '999.999.999,99';
      case 'milhar':
        return '999.999.999.999';
      case 'phone':
        return '9999-9999';
      case 'cellphone':
        return '99999-9999';
      case 'phone_with_ddd':
        return '(99) 9999-9999';
      case 'cellphone_with_ddd':
        return '(99) 99999-9999';
      case 'cpf':
        return '999.999.999-99';
      case 'cnpj':
        return '99.999.999/9999-99';
      case 'bank-account':
        return '99.999-9';
      case 'agency':
        return '999999-9';
      case 'numProcesso':
        return '999999';
      case 'numRecibo':
        return '9999999';
      case 'ano':
        return '9999';
      default:
        return this.data_mask;
    }
  }

  setModelValue($event: any, valor: any) {

    switch (this.data_mask) {
      case 'currency':
        if (typeof this.onChange) {
          this.onChange(Number(valor.replace(/[^0-9]/g, '')) / 100);
        }
        break;
      case 'date':

        if ($event.target.value.length === 2 || $event.target.value.length === 5 || $event.target.value.length === 10) {
          this.onChange(moment($event.target.value, 'DD/MM/YYYY').format());
        }
        break;
      default:

        this.onChange(this.getValueMask(valor));
    }
  }

  deleteFunction($event: any, valor: any) {
    switch (this.data_mask) {
      case 'currency':
        if (typeof this.onChange) {
          this.onChange(valor);
        }
        $event.target.value = this.formatCurrency(valor);
        break;
      case 'date':
        if ($event.target.value.length === 2 || $event.target.value.length === 5 || $event.target.value.length === 10) {
          this.onChange(moment($event.target.value, 'DD/MM/YYYY').format());
        } else if ($event.target.value.length < 2) {
          this.onChange('');
        }
        break;
      default:
        this.onChange(this.getValueMask(valor));

    }
  }

  formatCurrency(valor: string) {
    return this.CurrencyPipe.transform(valor, true);
  }

}
