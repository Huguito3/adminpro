import { Hospital } from './../../../models/hospital.model';
import { HospitalService } from './../../../services/hospital.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando = true;
  public imgSubs: Subscription;
  constructor(private hospitalService: HospitalService, private modalService: ModalImagenService,
              private busquedaUsuarios: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalService.nuevaImagen.pipe(delay(1000)).subscribe(img => {
      this.cargarHospitales();
    });
  }

  cargarHospitales(): void {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe(
      hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
      }
    );
  }
  guardarCambios(hospital: Hospital): void {

    this.hospitalService.actualizarHospitales(hospital._id, hospital.nombre).subscribe(
      resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      }
    );
  }

  borrarHospital(hospital: Hospital): void {
    // this.hospitalService.borrarHospitales(hospital._id).subscribe(
    //   resp => {
    //     this.cargarHospitales();
    //     Swal.fire('Borrado', hospital.nombre, 'success');
    //   }
    // );

    Swal.fire({
      title: 'Borrar Hospital?',
      text: `Seguro que queires borrar el hodpital: ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.borrarHospitales(hospital._id).subscribe(
          resp => {
            this.cargarHospitales();
            Swal.fire(
              'Hospital borrado!',
              `${hospital.nombre} fue eliminado correctamente`,
              'success'
            );
          }
        );
      }
    });
  }



  async crearHospital() {
    const respuesta = await Swal.fire({
      title: 'Crear Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (respuesta.isConfirmed && respuesta.value) {
      this.hospitalService.crearHospitales(respuesta.value).subscribe(
        res => {
          this.cargarHospitales();
        }
      );
    }

  }

  abrirModal(hospital: Hospital): void {
    this.modalService.abrirModal('hospitales', hospital._id, hospital.image);
  }

  buscar(termino: string): any {

    if (termino.length === 0) {

      return this.hospitales = this.hospitalesTemp;

    }
    this.busquedaUsuarios.buscarUsuarios('hospitales', termino).subscribe(
      resultados => {
        this.hospitales = resultados;
      }
    );
  }
}
