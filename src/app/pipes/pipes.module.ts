import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CpfCnpjPipe } from './masks/cpfcnpj.pipe.js';
import { CurrencyPipe } from './masks/currency.pipe.js';
import { CurrencyTotalPipe } from './masks/currencyTotal.pipe';
import { DatePipe } from './masks/date.pipe.js';
import { CustomFormatPipe } from './masks/custom-format.pipe.js';
import { DecimalPipe } from './masks/decimal.pipe.js';
import { OrderByPipe } from './order-by/order-by.pipe.js';
import { NomeMesPipe } from './text/nome-mes.pipe.js';
import { FilterPipe } from './filter/filter.pipe';
import { EstadoPipe } from './masks/estado.pipe';
import { SexoPipe } from './masks/sexo.pipe';
import { BancosPipe } from './masks/bancos/bancos.pipe';
import { StatusPedidoPipe } from './masks/status-pedido/status-pedido.pipe';
import { TruncatePipe } from './text/limite-caractere.pipe';
import { KeysPipe } from './foreach/object.pipe';
import { CardsPipe } from './cards/cards.pipe';
import { AvatarPipe } from './avatar/avatar.pipe';
import { TypeDocPipe } from './typeDoc/type-doc.pipe';
import { TableDiviserPipe } from './table-diviser.pipe';
import { ServicesModule } from '../services/services.module.js';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ServicesModule
  ],
  declarations: [
    CpfCnpjPipe,
    CurrencyPipe,
    CurrencyTotalPipe,
    DatePipe,
    CustomFormatPipe,
    DecimalPipe,
    OrderByPipe,
    NomeMesPipe,
    TruncatePipe,
    KeysPipe,
    FilterPipe,
    EstadoPipe,
    SexoPipe,
    BancosPipe,
    StatusPedidoPipe,
    CardsPipe,
    AvatarPipe,
    TypeDocPipe,
    TableDiviserPipe,
  ],
  exports: [
    CpfCnpjPipe,
    CurrencyPipe,
    CurrencyTotalPipe,
    DatePipe,
    CustomFormatPipe,
    DecimalPipe,
    OrderByPipe,
    NomeMesPipe,
    TruncatePipe,
    KeysPipe,
    FilterPipe,
    EstadoPipe,
    SexoPipe,
    BancosPipe,
    StatusPedidoPipe,
    CardsPipe,
    AvatarPipe,
    TypeDocPipe,
    TableDiviserPipe
  ],
  providers: [
    CpfCnpjPipe,
    CurrencyPipe,
    CurrencyTotalPipe,
    DatePipe,
    CustomFormatPipe,
    DecimalPipe,
    OrderByPipe,
    NomeMesPipe,
    TruncatePipe,
    KeysPipe,
    FilterPipe,
    EstadoPipe,
    SexoPipe,
    BancosPipe,
    StatusPedidoPipe,
    CardsPipe,
    AvatarPipe,
    TypeDocPipe
  ]
})
export class PipesModule { }
