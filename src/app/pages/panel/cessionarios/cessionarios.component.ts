import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { environment } from 'src/environments/environment.hmr';
import { BancosPipe } from 'src/app/pipes/masks/bancos/bancos.pipe';
import { CpfCnpjPipe } from 'src/app/pipes/masks/cpfcnpj.pipe';
import { StatusPedidoPipe } from 'src/app/pipes/masks/status-pedido/status-pedido.pipe';
import { NbDialogService } from '@nebular/theme';
import { ActionsTableComponent } from 'src/app/components/actions-table/actions-table.component';
import * as CryptoJS from 'crypto-js';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { generateID } from '../../../util/id.generate';
import Swal from 'sweetalert2';
declare var Email: any;

@Component({
  selector: 'app-cessionarios',
  templateUrl: './cessionarios.component.html',
  styleUrls: ['./cessionarios.component.scss'],
  providers: [CpfCnpjPipe, BancosPipe, StatusPedidoPipe]
})
export class CessionariosComponent implements OnInit {
  @ViewChild('dialog') dialog: any;

  loading = false;
  loginRequest = false;
  FormRegister: FormGroup;
  step = 1;
  disabled = false;
  textFileInput = 'Nenhum arquivo selecionado';

  settings = {};

  items = [];

  itemsFilter = [];

  token: any;

  status = [];

  error: any;

  selectedItem = '';

  data = [
    {
      label: 'Convidado',
      number: 0,
      active: false
    },
    {
      label: 'Recusados',
      number: 0,
      active: false
    },
    {
      label: 'Cadastro Finalizado',
      number: 0,
      active: true
    },
    {
      label: 'Aprovado Backoffice',
      number: 0,
      active: true
    }

  ];


  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private FormBuilder: FormBuilder,
    private request: RequestsService,
    private cnpjMask: CpfCnpjPipe,
    private satatusCtrl: StatusPedidoPipe,
    private dialogService: NbDialogService
  ) {
    this.FormRegister = this.FormBuilder.group({
      personal: this.FormBuilder.group({
        cnpj: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.email)
      }),
      sendMail: this.FormBuilder.group({
        mensage: new FormControl('', Validators.required),
        archive: new FormControl()
      })
    });
  }

  ngOnInit() {

    this.request.token.subscribe(token => {
      if (typeof token === 'string') {
        this.token = token;
        this.getCessionarios(token);
        this.getStatus(token);
      }
    });

    this.settings = {
      columns: {
        documentation: {
          title: 'CNPJ',
          editable: false,
          filter: false,
        },
        name: {
          title: 'NOME',
          editable: false,
          filter: false,
        },
        email: {
          title: 'E-MAIL',
          editable: false,
          filter: false,
        },
        situation: {
          title: 'SITUAÇÃO CADASTRAL',
          editable: false,
          filter: false,
        },
        action: {
          title: '',
          type: 'custom',
          editable: false,
          filter: false,
          renderComponent: ActionsTableComponent,
          onComponentInitFunction: (instance) => {
            instance.action.subscribe((row) => {
              this.request.token.subscribe(token => {
                if (token) {
                  this.send(row.item, token);
                }
              });
            });
          }
        },
      },
      actions: false
    };
  }

  onCustom(event, dialog) {

  }

  handleChangeFileInput(e) {
    let { type } = e.target.files[0];

    if (type !== 'text/csv') {
      Swal.fire({
        title: 'Extensão não permitida.',
        text: 'Aceitamos apenas CSV.',
        type: 'warning',
        showCancelButton: false,
        showConfirmButton: false,
        customClass: 'default'
      });
      return;
    }

    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    reader.onload = () => {
      const csvData = reader.result;
      const csvRecordsArray = (csvData as string).split(/\r\n|\n/);

      const headersRow = this.getHeaderArray(csvRecordsArray);

      this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length).then(() => {
        this.open(this.dialog);
        this.step = 4;
      });
    };

    // tslint:disable-next-line:only-arrow-functions
    reader.onerror = function () {
      console.log('error is occured while reading file!');
    };
  }


  async getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < csvRecordsArray.length; i++) {
      const row = (csvRecordsArray[i] as string).split(';');
      if (row && row.length > 1) {
        const data = {
          IdCessionario: generateID(),
          CNPJ: row[0],
          Nome: row[1],
          Email: row[2],
          IdStatusCessionario: 0,
          IdCedente: environment.api.user.codCliente,
          token: this.token
        };
        console.log(data);
        await this.request.post(`/cedentes/cessionario/invite`, data, this.token)
          .then(async res => {
            if (typeof res !== 'string') {
              const hash = CryptoJS.AES.encrypt(JSON.stringify(data), environment.api.client_secret).toString();
              const trim = CryptoJS.enc.Utf8.parse(hash);
              const urlHash = CryptoJS.enc.Base64.stringify(trim);
              const url = `${environment.baseURL}/convite?token=${urlHash}`;

              this.loading = true;

              const dataSend = {
                mailto: data.Email,
                subject: 'Banco Arbi - Convite para cessionário',
                text: '',
                url,
                user: JSON.stringify(environment.api.user)
              };

              this.request.sendMail(dataSend)
                .then(mail => {
                  if (mail && mail.status === 200) {
                    this.loading = false;
                    this.getCessionarios(this.token);
                  }
                });
            } else {
              this.loading = false;
              this.error = res;
            }
          })
          .catch(error => {
            this.loading = false;
            console.error(error);
          });
      }
    }
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(',');
    const headerArray = [];
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }


  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  closer(ref) {
    this.FormRegister.reset();
    this.step = 1;
    ref.close();
  }

  send(item, token) {
    const object = JSON.parse(item);

    const data = {
      IdCessionario: object.IdCessionario,
      CNPJ: object.CNPJ,
      Nome: object.Nome,
      Email: object.Email,
      IdStatusCessionario: object.IdStatusCessionario,
      IdCedente: environment.api.user.codCliente,
      token
    };


    const hash = CryptoJS.AES.encrypt(JSON.stringify(data), environment.api.client_secret).toString();
    const trim = CryptoJS.enc.Utf8.parse(hash);
    const urlHash = CryptoJS.enc.Base64.stringify(trim);
    const url = `${environment.baseURL}/convite?token=${urlHash}`;

    Email.send({
      SecureToken: environment.email.token,
      To: data.Email,
      From: data.Email,
      Subject: 'Banco Arbi - Convite para cessionário',
      // tslint:disable-next-line:max-line-length
      Body: `O usuário FULANO enviou um convite para você, para aceitar basta preencher o cadastro no link: <a href="${url}">Preencher o convite</a>`
    });
  }


  getCessionarios(token) {
    this.loginRequest = true;
    this.request.get(`/cedentes/${environment.api.user.codCliente}/cessionarios`, token)
      .then(async res => {
        this.loginRequest = false;
        if (typeof res === 'object') {
          this.items = [];
          this.itemsFilter = [];
          this.data[0].number = 0;
          this.data[1].number = 0;
          this.data[2].number = 0;

          await res.map(itm => {
            this.items = [
              ...this.items,
              {
                documentation: this.cnpjMask.transform(itm.CNPJ),
                name: itm.Nome,
                email: itm.Email,
                situation: this.satatusCtrl.transform(itm.IdStatusCessionario),
                action: itm.IdStatusCessionario === 0 ? JSON.stringify(itm) : ''
              }
            ];

            this.itemsFilter = [
              ...this.itemsFilter,
              {
                documentation: this.cnpjMask.transform(itm.CNPJ),
                name: itm.Nome,
                email: itm.Email,
                situation: this.satatusCtrl.transform(itm.IdStatusCessionario),
                action: itm.IdStatusCessionario === 0 ? JSON.stringify(itm) : ''
              }
            ];


            this.handleData(itm.IdStatusCessionario);

          });

          this.items = this.orderBy(this.items);
        }
      });
  }

  handleData(status) {
    const data = this.data;
    switch (status) {
      case 0: {
        data[0].number++;
        break;
      }
      case 1: {
        data[1].number++;
        break;
      }
      case 2: {
        data[2].number++;
        break;
      }
      case 3: {
        data[3].number++;
        break;
      }
    }
  }

  getStatus(token) {
    this.request.get(`/cedentes/cessionarios/status`, token)
      .then(res => {
        if (typeof res === 'object') {
          this.status = res;
        }
      });
  }


  save(form, step) {

    this.loading = true;
    const data = {
      IdCessionario: generateID(),
      CNPJ: Number(form.personal.cnpj.replace(/[^\w\s]/gi, '')),
      Nome: form.personal.name,
      Email: form.personal.email,
      IdStatusCessionario: 0,
      IdCedente: environment.api.user.codCliente,
      token: this.token
    };
    this.request.post(`/cedentes/cessionario/invite`, data, this.token)
      .then(async res => {
        if (typeof res !== 'string') {
          const hash = CryptoJS.AES.encrypt(JSON.stringify(data), environment.api.client_secret).toString();
          const trim = CryptoJS.enc.Utf8.parse(hash);
          const urlHash = CryptoJS.enc.Base64.stringify(trim);
          const url = `${environment.baseURL}/convite?token=${urlHash}`;

          this.loading = true;
          console.log(form);

          const dataSend = {
            mailto: form.personal.email,
            subject: 'Banco Arbi - Convite para cessionário',
            text: form.sendMail.mensage,
            url,
            user: JSON.stringify(environment.api.user)
          };

          if (form.sendMail.archive) {
            const sendFile = {
              file: form.sendMail.archive,
              id: environment.api.user.codCliente
            };
            await this.request.upload(sendFile)
              .then(file => {
                const parseFile = JSON.parse(file._body);
                // tslint:disable-next-line: no-string-literal
                dataSend['attachment'] = {
                  file: parseFile.file.name,
                  path: parseFile.file.url
                };
              });
          }

          this.request.sendMail(dataSend)
            .then(mail => {
              if (mail && mail.status === 200) {
                this.loading = false;
                this.nextStep(4);
                this.getCessionarios(this.token);
              }
            });
        } else {
          this.loading = false;
          this.error = res;
        }
      })
      .catch(error => {
        this.loading = false;
        console.error(error);
      });
  }

  searchCessionario(event) {
    const cnpj = event.target.value.replace(/[^\w\s]/gi, '');
    if (cnpj.length === 14) {
      this.request.get(`/cedentes/cessionarios/${cnpj}`, this.token)
        .then(res => {
          if (res && res.length > 0) {
            this.disabled = true;
            this.FormRegister.get('personal').patchValue({
              cnpj: res[0].CNPJ,
              email: res[0].Email,
              name: res[0].Nome
            });
            console.log(this.FormRegister.value);
          }
        });
    }
  }

  handleSelectAttachment(e) {
    const files = e.target.files;
    console.log(files);
    const file = files[0];
    // tslint:disable-next-line:no-string-literal
    this.FormRegister.controls.sendMail['controls'].archive.setValue(file);

    this.textFileInput = file.name;
  }

  nextStep(step) {
    this.step = step;
  }

  prevStep(step) {
    this.step = step;
  }

  shortUrl(url) {
    const len = url.length;
    if (len > 30) {
      return url.substr(0, 21) + '...' + url.substring(len - 9, len);
    }
    return url;
  }

  orderBy(array) {
    return array.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
  }


  filterStatus(status) {
    this.items = this.orderBy(this.itemsFilter);

    if (status) {
      const filter = this.items.filter(res => res.situation === this.satatusCtrl.transform(Number(status)));
      this.items = this.orderBy(filter);
    }
  }

  filterName(event) {
    const value = event.target.value;
    this.items = this.orderBy(this.itemsFilter);

    if (value) {
      const filter = this.items.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
      this.items = this.orderBy(filter);
    }
  }

}
