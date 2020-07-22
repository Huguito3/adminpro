import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica-um',
  templateUrl: './grafica-um.component.html',
  styles: [
  ]
})
export class GraficaUmComponent {
  labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  labelsCompra: string[] = ['Supermercado', 'Casa', 'Auto'];
  data = [
    [350, 450, 100]
  ];
}
