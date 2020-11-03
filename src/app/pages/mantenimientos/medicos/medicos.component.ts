import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { MedicoService } from './../../../services/medico.service';
import { Medico } from './../../../models/medico.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public totalMedicos = 0;
  public medicos: Medico[];
  public medicosTemp: Medico[];
  public desde = 0;
  public cargando = true;
  public imgSubs: Subscription;
  constructor(private medicoService: MedicoService, private busquedaUsuarios: BusquedasService,
    private modalService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalService.nuevaImagen.pipe(delay(1000)).subscribe(img => {
      this.cargarMedicos();
    });
  }

  cargarMedicos(): void {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe(
      medicos => {
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
      }
    );
  }


  abrirModal(medico: Medico): void {
    console.log(medico);
    console.log(medico._id);
    console.log(medico.image);
    this.modalService.abrirModal('medicos', medico._id, medico.image);
  }

  buscar(termino: string): any {

    if (termino.length === 0) {

      return this.medicos = this.medicosTemp;

    }
    this.busquedaUsuarios.buscarUsuarios('medicos', termino).subscribe(
      resultados => {
        this.medicos = resultados;
      }
    );
  }

  borrar(medico: Medico): void {
    Swal.fire({
      title: 'Borrar Medico?',
      text: `Seguro que queires borrar el medico: ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedicos(medico).subscribe(
          resp => {
            this.cargarMedicos();
            Swal.fire(
              'Usuario borrado!',
              `${medico.nombre} fue eliminado correctamente`,
              'success'
            );
          }
        );
      }
    });
  }

}
