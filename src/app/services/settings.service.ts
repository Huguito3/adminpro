import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public linkTheme = document.querySelector('#theme');
  public defaultTheme = './assets/css/colors/default-dark.css';
  constructor() {
    console.log('Settings service');
    const urlLocalStorage = localStorage.getItem('theme');
    this.linkTheme.setAttribute('href', urlLocalStorage != null ? urlLocalStorage : this.defaultTheme);

  }

  changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }

  checkCourrentTheme(): void {
    const links = document.querySelectorAll('.selector');
    links.forEach(
      elem => {
        elem.classList.remove('working');
        const btnTheme = elem.getAttribute('data-theme');
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        const currentTheme = this.linkTheme.getAttribute('href');

        if (btnThemeUrl === currentTheme) {
          elem.classList.add('working');
        }
      }
    );
  }
}
