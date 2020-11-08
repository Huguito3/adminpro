import { AuthGuard } from './../guards/auth.guard';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {// colocnado el path dashboard arriba del children, en vez de dejarlo como ''. ahora todas las rutas de
    // de aqui serian dashboard/progress -- dashboard/graficasUm
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

