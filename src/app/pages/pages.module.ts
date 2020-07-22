import { ComponentsModule } from './../components/components.module';


import { RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule   } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaUmComponent } from './grafica-um/grafica-um.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from './../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
// Vamos usar neste modulo los componentes, si precisamos usarlos em outros modulos precisamos exportarlos

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficaUmComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficaUmComponent,
    PagesComponent,
  ]
})
export class PagesModule { }
