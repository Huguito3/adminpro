import { SideBarService } from './../services/side-bar.service';
import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  // public linkTheme = document.querySelector('#theme');
  // public defaultTheme = './assets/css/colors/default-dark.css';
  constructor(private settings: SettingsService, private siderBarSeetings: SideBarService) {

  }

  ngOnInit(): void {

    //Precisamos cargar los js del diseno, este js no es angular. Precisamos inicializar las funciones para que sean uilziadas
    customInitFunctions();
    this.siderBarSeetings.cargarMenu();
    // const urlLocalStorage = localStorage.getItem('theme');
    // this.linkTheme.setAttribute('href', urlLocalStorage != null ? urlLocalStorage : this.defaultTheme);

  }

}
