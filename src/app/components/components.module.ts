import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbMenuInternalService, NbMenuService } from '@nebular/theme/components/menu/menu.service';
import {
  NbSidebarModule,
  NbLayoutModule,
  NbSidebarService,
  NbThemeModule,
  NbMenuModule,
  NbUserModule,
  NbSelectModule,
  NbInputModule,
  NbCardModule
} from '@nebular/theme';
import { HeaderComponent } from './header/header.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ActionsTableComponent } from './actions-table/actions-table.component';
import { ActionsCessaoTableComponent } from './actions-cessao-table/actions-cessao-table.component';


@NgModule({
  declarations: [
    HeaderComponent,
    AlertsComponent,
    ActionsTableComponent,
    ActionsCessaoTableComponent
  ],
  entryComponents: [
    ActionsTableComponent,
    ActionsCessaoTableComponent
  ],
  exports: [
    HeaderComponent,
    AlertsComponent,
    ActionsTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule,
    NbUserModule,
    NbSelectModule,
    NbInputModule,
    NbMenuModule,
    NbCardModule
  ],
  providers: [NbSidebarService, NbMenuInternalService, NbMenuService]
})
export class ComponentsModule { }
