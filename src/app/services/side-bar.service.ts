import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      subMenu: [
        {
          titulo:  'Main', url: '/'
        },
        {
          titulo:  'ProgressBar', url: 'progress'
        },
        {
          titulo:  'Graficas', url: 'graficaum'
        },
        {
          titulo:  'Promesas', url: 'promesas'
        },
        {
          titulo:  'Rxjs', url: 'rxjs'
        }
      ]
    }
  ];
  constructor() { }
}
