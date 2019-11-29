// import { ServicesService } from './../services/services/services.service';
import { Directive, ElementRef, NgZone, EventEmitter, Output, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestsService } from '../services/requests/requests.service';

declare var $: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[CepRequest]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(keyup)': 'buscaCEP()'
  },
})

export class CepRequestDirective {
  @Input()
  form_directive: any;
  @Input()
  group_endereco: boolean;
  @Input()
  geolocation: boolean;
  @Output()
  ngModelChange: EventEmitter<any> = new EventEmitter(false);
  constructor(
    private HttpService: RequestsService,
    private el: ElementRef,
    private _ngZone: NgZone
  ) { }
  elem: any = this.el.nativeElement;
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.checkInputs();
  }
  checkInputs() {
    if (!this.form_directive) {
      alert('Form de Entrada para CepRequestDirective não informado.');
    }
  }
  buscaCEP() {
    if (this.form_directive.value.cep && this.form_directive.value.cep.length === 9) {
      const cep = this.form_directive.value.cep.replace(/\D/g, '');
      const URL = `https://viacep.com.br/ws/${cep}/json/ `;
      this.HttpService.getExternal(URL)
        .then((result) => {
          if (result) {
            const retorno = {
              'cep': result && result.cep ? result.cep : '',
              'street': result && result.logradouro ? result.logradouro : '',
              'complement': '',
              'neighborhood': result && result.bairro ? result.bairro : '',
              'city': result && result.localidade ? result.localidade : '',
              'state': result && result.uf ? result.uf : ''
            };
            for (const d in retorno) {
              if (d === 'geolocation' && !this.geolocation) {
                continue;
              }
              if (this.group_endereco) {
                this.form_directive.value.endereco[d] = retorno[d];
              } else {
                this.form_directive.value[d] = retorno[d];
              }
            }
            this.form_directive.patchValue(this.form_directive.value);
          } else {
            $(this.elem).closest('.form-group').removeAttr('class').addClass('form-group has-danger');
            $(this.elem).addClass('form-control-danger');
          }
        }).catch((err) => {
          console.error(err);
        });
    }
  }
}
