import { Hospital } from './../../../models/hospital.model';
import { HospitalService } from './../../../services/hospital.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[] = [];
  public cargando = true;
  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(): void {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe(
      hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;

      }
    );
  }

}
