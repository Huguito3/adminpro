import { NgModule } from '@angular/core';
import { AdminGuard } from './../guards/admin.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { GraficaUmComponent } from './grafica-um/grafica-um.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';


const Childroutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
  { path: 'graficaum', component: GraficaUmComponent, data: { titulo: 'Grafica #1' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuentas' } },
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medico' } },
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' } },
  //Rutas de Admin
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuario de aplicacion' } },

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(Childroutes)
  ],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
