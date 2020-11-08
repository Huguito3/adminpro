import { Hospital } from './../../models/hospital.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];
  constructor(private activatedRoute: ActivatedRoute, private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);

    });
  }

  busquedaGlobal(termino: string): void {
    this.busquedaService.busquedaGlobal(termino).subscribe(
      resp => {
        console.log(resp);
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      }
    );
  }

  abrirMedico(medico: Medico) {

  }
}
