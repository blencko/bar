import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './panel.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ShortUrlService, ShortUrlModule } from 'angular-shorturl';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import {
  NbSidebarModule,
  NbLayoutModule,
  NbSidebarService,
  NbThemeModule,
  NbMenuModule,
  NbUserModule,
  NbSelectModule,
  NbInputModule,
  NbCardModule,
  NbDialogModule,
  NbSpinnerModule,
  NbAlertModule,
  NbStepperModule,
  NbProgressBarModule,
  NbToastrModule,
  NbTabsetModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NbMenuInternalService, NbMenuService } from '@nebular/theme/components/menu/menu.service';
import { ComponentsModule } from '../../components/components.module';
import { ServicesModule } from '../../services/services.module';
import { HttpModule } from '@angular/http';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PanelComponent } from './panel.component';
import { CessaoTitulosComponent } from './cessao-titulos/cessao-titulos.component';
import { CessionariosComponent } from './cessionarios/cessionarios.component';
import { ReportsComponent } from './reports/reports.component';
import { ExportAsModule } from 'ngx-export-as';
import { LiquidationComponent } from './liquidation/liquidation.component';
import { EventsComponent } from './events/events.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PanelComponent,
    CessaoTitulosComponent,
    CessionariosComponent,
    ReportsComponent,
    LiquidationComponent,
    EventsComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExportAsModule,
    ReactiveFormsModule,
    FormsModule,
    NbToastrModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    RouterModule,
    NbLayoutModule,
    ComponentsModule,
    DirectivesModule,
    NbProgressBarModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    NbStepperModule,
    NbTabsetModule,
    NgxDaterangepickerMd.forRoot(),
    NbDialogModule.forChild(),
    ShortUrlModule.forRoot(),
    PipesModule,
    NbAlertModule,
    NbSidebarModule,
    NbUserModule,
    NbSelectModule,
    NbInputModule,
    NbMenuModule,
    ServicesModule,
    HttpModule,
    NbCardModule
  ],
  providers: [NbSidebarService, NbMenuInternalService, NbMenuService, ShortUrlService, { provide: LOCALE_ID, useValue: 'pt-PT' }],
  bootstrap: [PanelComponent]
})
export class PanelModule { }
