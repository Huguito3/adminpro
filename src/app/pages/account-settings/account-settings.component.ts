import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');
  public links: NodeListOf<Element>;
  constructor() {

   }

  ngOnInit(): void {
    // tengo que colocarlo aqui, porque en el ngon inigt ya se que fue renderizado el componente
    this.links = document.querySelectorAll('.selector');
    this.checkCourrentTheme();
  }
  changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCourrentTheme();
  }

  checkCourrentTheme(): void {

    this.links.forEach(
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
