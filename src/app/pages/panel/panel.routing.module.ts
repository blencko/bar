import { CessaoTitulosComponent } from './cessao-titulos/cessao-titulos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CessionariosComponent } from './cessionarios/cessionarios.component';
import { PanelComponent } from './panel.component';
import { ReportsComponent } from './reports/reports.component';
import { LiquidationComponent } from './liquidation/liquidation.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'painel/dashboard' },
  {
    path: 'painel', component: PanelComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cessionarios', component: CessionariosComponent },
      { path: 'cessao-de-titulos', component: CessaoTitulosComponent },
      { path: 'relatorios', component: ReportsComponent },
      { path: 'liquidacoes', component: LiquidationComponent },
      { path: 'eventos', component: EventsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
