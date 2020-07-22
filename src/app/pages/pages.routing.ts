import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PagesComponent } from './pages.component';
import { GraficaUmComponent } from './grafica-um/grafica-um.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {// colocnado el path dashboard arriba del children, en vez de dejarlo como ''. ahora todas las rutas de
  // de aqui serian dashboard/progress -- dashboard/graficasUm
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'graficaum', component: GraficaUmComponent },
      { path: 'account-settings', component: AccountSettingsComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

