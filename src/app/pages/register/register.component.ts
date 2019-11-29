import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.hmr';
import { ActivatedRoute } from '@angular/router';
import md5 from 'crypto-js/md5';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { Select2OptionData } from 'ng2-select2';
import { NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

interface Cessionario {
  IdDadosBancariosCessionario: any;
  PessoaContato: number;
  TelefoneContato: number;
  Observacao: string;
  IdStatusCessionario: number;
  IdTipoDoPagamento: number;
}

interface BankCessionario {
  IdBanco: any;
  Agencia: any;
  Conta: any;
  IdFinalidadeCredito: any;
  IdCessionario: any;
  IdTipoDeConta: any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})


export class RegisterComponent implements OnInit {
  loading = false;
  FormRegister: FormGroup;
  cessionario: any;
  disabled = true;
  success = false;
  verifyStatus = false;
  banks: Array<Select2OptionData> = [
    {
      text: 'Selecione um banco',
      id: ''
    }
  ];

  agencies: Array<Select2OptionData> = [
    {
      text: 'Selecione uma agência',
      id: ''
    }
  ];

  typePayment: Array<Select2OptionData> = [
    {
      text: 'Selecione um tipo de pagamento',
      id: ''
    }
  ];

  typeAccount: Array<Select2OptionData> = [
    {
      text: 'Selecione um tipo de conta',
      id: ''
    }
  ];

  endCredit: Array<Select2OptionData> = [
    {
      text: 'Selecione uma finalidade de crédito',
      id: ''
    }
  ];

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private FormBuilder: FormBuilder,
    private router: ActivatedRoute,
    private request: RequestsService,
    private toastrService: NbToastrService
  ) {
    this.router.queryParams.subscribe(res => {
      if (res && res.token) {
        const data = this.decryptData(res.token);
        this.cessionario = JSON.parse(data);
        this.verify(JSON.parse(data));
      }
    });

    this.FormRegister = this.FormBuilder.group({
      people_contact: ['', Validators.required],
      phone: ['', Validators.required],
      observation: [''],
      type_payment: ['', Validators.required],
      bank: this.FormBuilder.group({
        idbank: ['', Validators.required],
        agency: ['', Validators.required],
        account: ['', Validators.required],
        end_of_credit: ['', Validators.required],
        type_of_account: ['', Validators.required]
      })
    });
  }


  ngOnInit() {
    this.commonQuerys();
  }


  verify(cessionario) {
    const data = {
      IdCedente: cessionario.IdCedente,
      IdCessionario: cessionario.IdCessionario
    };

    this.request.get(`/cedentes/${data.IdCedente}/cessionarios/${data.IdCessionario}/status`, cessionario.token)
      .then(res => {
        if (res && res.length > 0) {
          if (res[0].IdStatusCessionario !== 0) {
            this.verifyStatus = true;
            setTimeout(() => {
              window.location.href = 'https://www.bancoarbi.com.br';
            }, 5000);
          }
        }
      })
      .catch(error => {
        this.verifyStatus = true;
        console.error(error);
      });
  }




  changeAgencies(event) {
    this.FormRegister.get('bank').patchValue({ agency: event.value });
  }

  changeTypePayment(event) {
    this.FormRegister.patchValue({ type_payment: event.value });
  }

  changeBank(event) {
    this.FormRegister.get('bank').patchValue({ idbank: event.value });
    if (event.value) {
      this.disabled = false;
      this.getAgency(event.value);
    } else {
      this.disabled = true;
      this.agencies = [
        {
          text: 'Selecione uma agência',
          id: ''
        }
      ];
    }
  }

  changeTypeAccount(event) {
    this.FormRegister.get('bank').patchValue({ type_of_account: event.value });
  }

  changeEndCredit(event) {
    this.FormRegister.get('bank').patchValue({ end_of_credit: event.value });
  }

  getAgency(idBank) {
    this.agencies = [
      {
        text: 'Selecione uma agência',
        id: ''
      }
    ];
    this.request.get(`/backoffice/bancos/${idBank}/agencias`, false)
      .then(res => {
        if (res && res.length > 0) {
          res.map(response => {
            this.agencies = [
              ...this.agencies,
              {
                text: `${response.CODAGENCIA} - ${response.NOME}`,
                id: response.CODAGENCIA
              }
            ];
          });
        }
      });
  }

  getTypePayment() {
    this.request.get(`/backoffice/tipodepagamento`, false)
      .then(res => {
        if (res && res.length > 0) {
          res.map(response => {
            this.typePayment = [
              ...this.typePayment,
              {
                text: `${response.CodigoExterno} - ${response.Descricao}`,
                id: response.IdTipoDoPagamento
              }
            ];
          });
        }
      });
  }

  getBanks() {
    this.request.get('/backoffice/bancos', false)
      .then(res => {
        if (res && res.length > 0) {
          res.map(response => {
            this.banks = [
              ...this.banks,
              {
                text: `${response.IdBanco} - ${response.DescricaoBanco}`,
                id: response.IdBanco
              }
            ];
          });
        }
      });
  }

  getTypeCredits() {
    this.request.get('/backoffice/finalidadedecredito', false)
      .then(res => {
        if (res && res.length > 0) {
          res.map(response => {
            this.endCredit = [
              ...this.endCredit,
              {
                text: `${response.CodigoExterno} - ${response.Descricao}`,
                id: response.IdFinalidadeCredito
              }
            ];
          });
        }
      });
  }

  getTypeAccount() {
    this.request.get('/backoffice/tipodeconta', false)
      .then(res => {
        console.log(res);
        if (res && res.length > 0) {
          res.map(response => {
            this.typeAccount = [
              ...this.typeAccount,
              {
                text: `${response.CondigoExterno} - ${response.Descricao}`,
                id: response.IdTipoDeConta
              }
            ];
          });
        }
      });
  }


  commonQuerys() {
    this.getBanks();
    this.getTypePayment();
    this.getTypeCredits();
    this.getTypeAccount();
  }

  decryptData(data) {
    try {
      const parsedWordArray = CryptoJS.enc.Base64.parse(data);
      const parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
      const bytes = CryptoJS.AES.decrypt(parsedStr, environment.api.client_secret);
      const result = bytes.toString(CryptoJS.enc.Utf8);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  reject() {
    const data = {
      IdStatusCessionario: 1
    };

    this.request.put(`/backoffice/cessionario/${this.cessionario.IdCessionario}/rejeitar`, data, this.cessionario.token)
      .then(res => {
        if (typeof res !== 'string') {
          this.loading = false;
          if (res.result === 'success') {
            this.success = true;
          } else {
            this.toastrService.show('Houve um erro, tente mais tarde', 'Erro inesperado', { status: NbToastStatus.DANGER });
          }
        }
      });
  }
  save(form) {
    this.loading = true;
    const bank: BankCessionario = {
      IdBanco: form.bank.idbank,
      Agencia: form.bank.agency,
      Conta: form.bank.account,
      IdFinalidadeCredito: form.bank.end_of_credit,
      IdCessionario: this.cessionario.IdCessionario,
      IdTipoDeConta: form.bank.type_of_account
    };
    // return false;
    this.request.post('/backoffice/banco/cessionario', bank, this.cessionario.token)
      .then(res => {
        console.log(res);
        if (typeof res !== 'string') {
          this.getIdBank(bank.IdCessionario)
            .then(response => {
              console.log(response);
              if (typeof response !== 'string') {
                const data: Cessionario = {
                  IdDadosBancariosCessionario: response[0].IdDadosBancariosCessionario,
                  PessoaContato: form.people_contact,
                  TelefoneContato: form.phone,
                  Observacao: form.observation,
                  IdStatusCessionario: 2,
                  IdTipoDoPagamento: form.type_payment
                };
                this.updateCessionario(data);
              } else {
                this.loading = false;
              }
            });
        } else {
          this.loading = false;
        }
      });
  }


  updateCessionario(data) {
    this.request.put(`/backoffice/cessionario/${this.cessionario.IdCessionario}`, data, this.cessionario.token)
      .then(res => {
        if (typeof res !== 'string') {
          this.loading = false;
        } else {
          this.loading = false;
          this.toastrService.show('Solicite um novo convite ao cedente', 'Seu token foi expirado', { status: NbToastStatus.DANGER });
        }
      })
      .catch(error => {
        this.loading = false;
        this.toastrService.show('Solicite um novo convite ao cedente', 'Seu token foi expirado', { status: NbToastStatus.DANGER });
      });
  }

  async getIdBank(idcessionario) {
    let result;
    await this.request.get(`/backoffice/banco/cessionario/${idcessionario}`, false)
      .then(res => {
        result = res;
      });
    return result;
  }

}
