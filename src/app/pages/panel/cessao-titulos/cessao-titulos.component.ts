
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { environment } from 'src/environments/environment.hmr';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { orderBy } from '../../../util/order';
import { generateID } from '../../../util/id.generate';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import Swal from 'sweetalert2';
import { ActionsCessaoTableComponent } from 'src/app/components/actions-cessao-table/actions-cessao-table.component';

@Component({
  selector: 'app-cessao-titulos',
  templateUrl: './cessao-titulos.component.html',
  styleUrls: ['./cessao-titulos.component.scss'],
  providers: []
})
export class CessaoTitulosComponent implements OnInit {
  @ViewChild('dialog') public dialog: TemplateRef<any>;

  sitations = [];
  show = false;
  settings: any = {};

  items = [];
  itemsFilter = [];

  data = [
    {
      label: 'Cessões Reservadas',
      number: 0,
      active: true
    },
    {
      label: 'Cessões Incompletas',
      number: 0,
      active: false
    }
  ];




  // Variables Registers Cessoes
  FormFilter: FormGroup;
  FormValue: FormGroup;

  filter = false;

  cost: any;

  loading = false;
  locale = {};

  dataBox: Array<any> = [
    {
      text: 'Valor da Cessão',
      value: 0
    },
    {
      text: 'Modalidade',
      value: '-'
    },
    {
      text: 'Qnt. Cessionários',
      value: 0
    },
    {
      text: 'Regra de Rateio',
      value: '-'
    }
  ];



  FormSteps: any = {
    step: 1,
    progress: 25,
    value_section: 0,
    modality: '',
    sub_modality: '',
    quant_cessionario: 0,
    rule: '',
    type_value: 0,
    boletos: [],
    cessionarios: [],
    total: 0
  };

  token: any;


  boletos = [];
  boletosFilter = [];

  cessionarios = [];
  cessionariosFilter = [];
  // tslint:disable-next-line:variable-name
  type_cessoes = [];

  regraratio = [];


  constructor(
    private dialogService: NbDialogService,
    private requestCtrl: RequestsService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {


    this.settings = {
      columns: {
        IdCessao: {
          title: 'ID',
          editable: false,
          filter: false,
        },
        QtdeTitulos: {
          title: 'QTDE DE BOLETOS',
          editable: false,
          filter: false,
        },
        cessionarios: {
          title: 'QTDE DE CESSIONÁRIOS',
          editable: false,
          filter: false,
          valuePrepareFunction: (value) => value.length
        },
        IdModalidade: {
          title: 'MODALIDADE',
          editable: false,
          filter: false,
          valuePrepareFunction: (value) => {
            switch (value) {
              case 1:
                return 'Cessão Simples';
              case 2:
                return 'Split';
            }
          }
        },
        IdTipoRegraRateio: {
          title: 'REGRA DE RATEIO',
          editable: false,
          filter: false,
          valuePrepareFunction: (value) => {
            switch (value) {
              case '1':
                return 'Percentual';
              case '2':
                return 'Valor fixo';
            }
          }
        },
        IdStatusCessao: {
          title: 'SITUAÇÃO CESSÃO',
          editable: false,
          type: 'html',
          filter: false,
          valuePrepareFunction: (value) => {
            switch (value) {
              case 1:
                return `<span class="gray">Incompleta</span>`;
              case 2:
                return `<span class="yellow">Reservada</span>`;
              case 3:
                return `<span class="black">Aprovada/Fila de Liquidação</span>`;
              case 4:
                return `<span class="blue">Parcialmente Liquidada</span>`;
              case 5:
                return `<span class="green">Totalmente Liquidade</span>`;
            }
          }
        },
        action: {
          title: '',
          type: 'custom',
          editable: false,
          filter: false,
          renderComponent: ActionsCessaoTableComponent,
          onComponentInitFunction: (instance) => {
            instance.action.subscribe(row => {
              switch (row.action) {
                case 'edit':
                  this.open(this.dialog, row.item);
                  break;
              }
            });
          }
        }
      },
      actions: false
    };

    this.FormFilter = this.formBuilder.group({
      dateStart: [''],
      dateEnd: ['']
    });

    this.FormValue = this.formBuilder.group({
      values: ['']
    });

    moment.locale('pt-br');

    this.locale = {
      format: 'DD/MM/YYYY',
      separator: ' - ',
      cancelLabel: 'Cancelar',
      applyLabel: 'Ok',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek()
    };

    this.requestCtrl.token.subscribe(token => {
      if (typeof token === 'string') {
        this.token = token;
        this.getCessoes(token);
        this.getSituations(token);
      }
    });
  }

  handleSelectStatus(status) {
    if (status) {
      this.items = this.itemsFilter;
      this.items = this.items.filter(item => {
        // tslint:disable-next-line:triple-equals
        return item.IdStatusCessao == status;
      });
    } else {
      this.items = this.itemsFilter;
    }
  }

  handleSearch(event) {
    // const { value } = event.target;
    console.log(event);
  }
  open(dialog: TemplateRef<any>, item?) {
    this.dialogService.open(dialog);
    this.initOpenCessoes(this.token);

    if (item) {
      console.log(item);
      this.FormSteps = {
        step: 1,
        progress: 25,
        value_section: 0,
        modality: String(item.IdModalidade),
        sub_modality: item.CoParticipacao,
        quant_cessionario: item.cessionarios.length,
        rule: '',
        type_value: item.IdTipoRegraRateio,
        boletos: item.titulos,
        cessionarios: item.cessionarios,
        total: item.ValorCessao,
        IdCessao: item.IdCessao,
        edit: true
      };

      this.dataBox = [
        {
          text: 'Valor da Cessão',
          value: this.updateTotal(item.titulos)
        },
        {
          text: 'Modalidade',
          value: item.IdModalidade === 1 ? 'Cessão Simples' : 'Split'
        },
        {
          text: 'Qnt. Cessionários',
          value: item.cessionarios.length
        },
        {
          text: 'Regra de Rateio',
          value: item.IdTipoRegraRateio === '1' ? 'Percentual' : 'Valor fixo'
        }
      ];
    }
  }

  updateTotal(titulos) {
    let total = 0;

    titulos.map(resp => {
      total += resp.VLRREGISTROCONTABIL;
    });

    return total;
  }

  onClick(event) {
    this.show = false;
  }

  onCustom(event, dialog) {
    alert();
  }

  // Save, Update Incomplet Actions
  save(form, status?) {
    // console.log(form);
    // return false;
    const idCessao = form.IdCessao ? form.IdCessao : generateID(1012);

    // tslint:disable-next-line:variable-name
    const cessao_full: any = {
      IdCessao: idCessao,
      IdModalidade: Number(form.modality),
      IdTipoRegraRateio: form.type_value,
      ValorCessao: form.total,
      QtdeTitulos: form.boletos.length,
      IdCedente: environment.api.user.codCliente,
      CoParticipacao: form.sub_modality,
      IdStatusCessao: status ? status : 2,
      usuario: 'teste',
      cessionarios: [],
      titulos: [],
      data_cadastro: this.date()
    };

    const data = {
      IdCessao: idCessao,
      IdModalidade: Number(form.modality),
      IdTipoRegraRateio: form.type_value,
      ValorCessao: form.total,
      QtdeTitulos: form.boletos.length,
      IdCedente: environment.api.user.codCliente,
      CoParticipacao: form.sub_modality === 'integral' ? 0 : 1,
      IdStatusCessao: 2,
      usuario: 'teste',
      cessionarios: [],
      titulos: [],
      data_cadastro: this.date(),
      cessao_full
    };


    // update cessionários

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < form.cessionarios.length; i++) {
      const cessionario = {
        IdCessao: idCessao,
        IdCessionario: form.cessionarios[i].IdCessionario,
        ValorFinanceiroAtribuido: this.calc(form.type_value, form.cessionarios[i].value, this.dataBox[0].value),
        ValorPercentualAtribuido: this.porcentage(form.cessionarios[i].value, form.total),
        IdStatusLiquidacaoFinanceira: 1
      };

      // tslint:disable-next-line:variable-name
      const cessionario_cessao_full = {
        IdCessao: idCessao,
        ...form.cessionarios[i],
        ValorFinanceiroAtribuido: this.calc(form.type_value, form.cessionarios[i].value, this.dataBox[0].value),
        ValorPercentualAtribuido: this.porcentage(form.cessionarios[i].value, form.total),
        IdStatusLiquidacaoFinanceira: 1
      };

      data.cessionarios.push(cessionario);
      cessao_full.cessionarios.push(cessionario_cessao_full);
    }


    // update titulos
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < form.boletos.length; i++) {
      const boleto = {
        IdCessao: idCessao,
        NossoNumero: form.boletos[i].NOSSONUMERO
      };

      // tslint:disable-next-line:variable-name
      const boleto_cessao_full = {
        IdCessao: idCessao,
        ...form.boletos[i]
      };

      data.titulos.push(boleto);
      cessao_full.titulos.push(boleto_cessao_full);
    }

    data.cessao_full = JSON.stringify(data.cessao_full);

    if (form.edit) {
      this.requestCtrl.post(`/cessoes/${form.IdCessao}`, data, this.token)
        .then(res => {
          if (res && typeof res !== 'string') {
            this.FormSteps.step = 6;
            this.getCessoes(this.token);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.requestCtrl.post('/cessoes', data, this.token)
        .then(res => {
          if (res && typeof res !== 'string') {
            this.FormSteps.step = 6;
            this.getCessoes(this.token);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }


  incomplet(ref) {
    if (this.FormSteps.idCessao) {
      Swal.fire({
        title: 'Deseja excluir sua cessão?',
        text: '',
        type: 'error',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não, esper um pouco',
        customClass: 'custom'
      }).then((result) => {
        if (result.value) {
          this.delete(this.FormSteps);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.closer(ref);
        }
      });
    } else {
      Swal.fire({
        title: 'Deseja salvar sua cessão?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Sair',
        customClass: 'custom'
      }).then((result) => {
        if (result.value) {
          this.save(this.FormSteps, 1);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.closer(ref);
        }
      });
    }
  }


  delete(form) {

  }

  updateValue(item) {
    if (typeof item.value === 'string') {
      item.value = Number(item.value);
    }

    if (item.value === 0) {
      this.FormSteps.total = 0;
      this.FormSteps.cessionarios.map(res => {
        if (res.value) {
          this.FormSteps.total += res.value;
        }
      });
    } else {
      if (this.FormSteps.type_value === 1 && this.FormSteps.total > 100) {
        // tslint:disable-next-line:max-line-length
        this.toastrService.show('Valor maior que permitido', 'O valor total em porcentagem não pode ultrapassar 100%', { status: NbToastStatus.DANGER });
      }
      this.FormSteps.total = 0;
      this.FormSteps.cessionarios.map(res => {
        if (res.value) {
          this.FormSteps.total += res.value;
        }
      });
    }
  }

  // Handle Actions
  handleSelectCessionario(event, item) {
    const value = event.target.checked;
    if (value) {
      this.dataBox[2].value += 1;
      this.FormSteps.cessionarios.push(item);
    } else {
      this.dataBox[2].value -= 1;
      this.FormSteps.cessionarios = this.FormSteps.cessionarios.filter(res => res.id !== item.id);
    }
  }

  handleSelectBoletos(event, item) {
    const value = event.target.checked;
    const valueItem = Number(item.VLRREGISTROCONTABIL);
    if (value) {
      this.dataBox[0].value += valueItem;
      this.FormSteps.boletos.push(item);
    } else {
      this.dataBox[0].value -= valueItem;
      this.FormSteps.boletos = this.FormSteps.boletos.filter(res => {
        return res.NOSSONUMERO !== item.NOSSONUMERO;
      });
    }
  }

  handleValidation() {
    switch (this.FormSteps.step) {
      case 1:
        return this.FormSteps.boletos.length > 0 ? false : true;
      case 2:
        return this.FormSteps.modality ? false : true;
      case 3:
        return this.FormSteps.cessionarios.length > 0 ? false : true;
      case 4:
        // tslint:disable-next-line:triple-equals
        if (this.FormSteps.type_value == 1) {
          return this.FormSteps.total > 0 && this.FormSteps.total === 100 ? false : true;
        } else {
          return this.FormSteps.total > 0 && this.FormSteps.total === this.dataBox[0].value ? false : true;
        }
    }
  }

  handleCheck(id, type) {
    let val = false;
    switch (type) {
      case 'boletos':
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.FormSteps.boletos.length; i++) {
          if (id === (this.FormSteps.boletos[i].id ? this.FormSteps.boletos[i].id : this.FormSteps.boletos[i].NOSSONUMERO)) {
            val = true;
          }
        }
        return val;
      case 'cessionarios':
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.FormSteps.cessionarios.length; i++) {
          // tslint:disable-next-line:max-line-length
          if (id === this.FormSteps.cessionarios[i].IdCessionario) {
            val = true;
          }
        }
        return val;
    }
  }

  handleSelect(value, element: HTMLElement, type) {

    this.FormSteps.modality = JSON.stringify(type);

    this.FormSteps.sub_modality = value;

    // tslint:disable-next-line:max-line-length
    const allElements = document.querySelectorAll('.modal-custom.moda-secondary nb-card nb-card-body .box .box-checkbox .select-custom span');

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].classList.remove('active');
    }

    element.classList.add('active');
  }

  // Get Requests Infos BD
  getCessoes(token) {
    this.data[0].number = 0;
    this.data[1].number = 0;
    this.requestCtrl.get(`/cedentes/${environment.api.user.codCliente}/cessoes`, token)
      .then(res => {
        if (typeof res === 'object' && res.length > 0) {
          const filter = res
            .map(item => {
              const response = JSON.parse(item.cessao_full);

              switch (response.IdStatusCessao) {
                case 1:
                  this.data[1].number++;
                  break;
                case 2:
                  this.data[0].number++;
                  break;
              }

              return response;
            });

          this.items = filter;
          this.itemsFilter = filter;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getSituations(token) {
    this.requestCtrl.get('/cessoes/situacoes', token)
      .then(res => {
        if (typeof res !== 'string' && res && res.length > 0) {
          this.sitations = res;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getCessionarios(token) {
    this.requestCtrl.get(`/cedentes/${environment.api.user.codCliente}/cessionarios`, token)
      .then(res => {
        // s(res);
        if (res && res.length > 0) {
          this.cessionarios = res;
          this.cessionariosFilter = res;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getTitulos(token) {
    this.requestCtrl.get(`/cessoes/titulos/cedente/${environment.api.user.codCliente}`, token)
      .then(res => {
        if (res && res.length > 0) {
          this.boletos = orderBy(res, { a: 'DATAEMISSAO', b: 'DATAEMISSAO' });
          this.boletosFilter = orderBy(res);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getTiposCessoes(token) {
    this.requestCtrl.get('/cessoes/tiposdecessoes', token)
      .then(res => {
        if (res && res.length > 0) {
          this.type_cessoes = res;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getCost(token) {
    this.requestCtrl.get('/cessoes/custo', token)
      .then(res => {
        this.cost = res[0].cedente;
      })
      .catch(error => {
        console.error(error);
      });
  }

  getRateio(token) {
    this.requestCtrl.get('/cessoes/regraderateio', token)
      .then(res => {
        this.regraratio = res;
      })
      .catch(error => console.error(error));
  }

  // Functions Utils

  date() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  calc(type, value, total) {
    if (type === 1) {
      return (total / 100) * value;
    } else {
      return value;
    }
  }


  initOpenCessoes(token) {
    this.getCessionarios(token);
    this.getTitulos(token);
    this.getCost(token);
    this.getRateio(token);
    this.getTiposCessoes(token);
  }

  filterDate(event) {
    this.filter = true;

    const datepick = {
      start: new Date(moment(event.start).format()).getTime(),
      end: new Date(moment(event.end).format()).getTime()
    };

    // tslint:disable-next-line:max-line-length
    this.boletos = orderBy(this.boletos.filter(boleto => boleto.DATAEMISSAO >= datepick.start && boleto.DATAEMISSAO <= datepick.end), { a: 'DATAEMISSAO', b: 'DATAEMISSAO' });
    this.dataBox[0].value = 0;
    this.FormSteps.boletos = [];

  }

  porcentage(obtained, total) {
    const percent = obtained * 100 / total;
    return Number(percent.toFixed(2));
  }

  clear() {
    this.filter = false;
    this.boletos = this.boletosFilter;
  }

  rowback() {
    if (this.FormSteps.step === 5) {
      this.incomplet(this.FormSteps);
    } else {
      this.FormSteps.progress -= 25;
      this.FormSteps.step -= 1;
    }
  }

  filterName(event) {
    this.cessionarios = this.cessionariosFilter;
    if (event.target.value) {
      this.cessionarios = this.cessionarios.filter((item) => {
        return (item.Nome.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
      });
    } else {
      this.cessionarios = this.cessionariosFilter;
    }
  }


  closer(ref) {
    this.FormSteps = {
      step: 1,
      progress: 25,
      value_section: 0,
      modality: '',
      sub_modality: '',
      quant_cessionario: 0,
      rule: '',
      type_value: 0,
      boletos: [],
      cessionarios: [],
      total: 0
    };

    ref.close();
  }

  next() {
    if (this.FormSteps.step === 5) {
      this.save(this.FormSteps);
    } else {
      this.FormSteps.progress += 25;
      this.FormSteps.step += 1;
    }
  }
}
