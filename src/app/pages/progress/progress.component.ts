import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'
  ]
})
export class ProgressComponent {

  // tslint:disable-next-line: no-inferrable-types
  progreso1: number = 50;
  // tslint:disable-next-line: no-inferrable-types
  progreso2: number = 25;

  get getPorcentaje1(): string {
    return `${this.progreso1}%`;
  }
  get getPorcentaje2(): string {
    return `${this.progreso2}%`;
  }

cambioValorHijo(valor: number){
  console.log(valor);
}

}
