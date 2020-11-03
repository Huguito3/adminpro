import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './../guards/auth.guard';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PagesComponent } from './pages.component';
import { GraficaUmComponent } from './grafica-um/grafica-um.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

const routes: Routes = [
  {// colocnado el path dashboard arriba del children, en vez de dejarlo como ''. ahora todas las rutas de
    // de aqui serian dashboard/progress -- dashboard/graficasUm
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }  },
      { path: 'graficaum', component: GraficaUmComponent, data: { titulo: 'Grafica #1' }  },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuentas' }  },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }  },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' }  },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }  },
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuario de aplicacion' }  },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' }  },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medico' }  },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' }  },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

