import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Select2Module } from 'ng2-select2';
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
  NbToastrModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbMenuInternalService, NbMenuService } from '@nebular/theme/components/menu/menu.service';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';
import { HttpModule } from '@angular/http';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { PanelModule } from './pages/panel/panel.module';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    RouterModule,
    NbLayoutModule,
    ComponentsModule,
    DirectivesModule,
    NbToastrModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    Select2Module,
    NbDialogModule.forChild(),
    PipesModule,
    NbAlertModule,
    NbSidebarModule,
    NbUserModule,
    NbSelectModule,
    NbInputModule,
    NbMenuModule,
    ServicesModule,
    HttpModule,
    NbCardModule,
    PanelModule
  ],
  providers: [NbSidebarService, NbMenuInternalService, NbMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
