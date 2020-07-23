import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() titulo = 'Sin Titulo';
  @Input() labels: string[] = ['No Definido', 'No Definido', 'No Definido'];
  @Input() data: MultiDataSet;
  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet = [
    [100, 100, 100]
  ];
  // ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']
  // public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ];
  ngOnInit(): void {
    // this.titulo = 'Sin Titulo';
    this.doughnutChartLabels = this.labels;
    console.log(this.data);
    if (this.data) {
      this.doughnutChartData = this.data;
    }
  }

}
