import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');
  public defaultTheme = './assets/css/colors/default-dark.css';
  constructor() { }

  ngOnInit(): void {


    const urlLocalStorage = localStorage.getItem('theme');
    this.linkTheme.setAttribute('href', urlLocalStorage != null ? urlLocalStorage : this.defaultTheme);

  }

}
