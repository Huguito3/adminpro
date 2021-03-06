import { Router, ActivatedRoute } from '@angular/router';
import { MedicoService } from './../../../services/medico.service';
import { HospitalService } from './../../../services/hospital.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService,
              private medicoService: MedicoService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      //desectructuramos el param para obtener el id que es el unico que me interesa
      ({ id }) => {
        this.cargarMedico(id);
      }
    );

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges.subscribe(
      hospitalId => {
        console.log(hospitalId);
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
      }
    );
  }

  cargarMedico(id: string): void {
    if (id === 'nuevo') {
      return;
    }
    this.medicoService.obtenerMedicoByID(id).subscribe(
      resp => {
        if (!resp) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }
        const { nombre, hospital: { _id } } = resp;
        this.medicoSeleccionado = resp;
        this.medicoForm.setValue({ nombre, hospital: _id });
      }
    );
  }

  cargarHospitales(): void {
    this.hospitalService.cargarHospitales().subscribe(
      (hospital: Hospital[]) => {
        this.hospitales = hospital;
      }
    );
  }

  guardarMedico(): void {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedicos(data).subscribe(
        resp => {
          Swal.fire('Medico Actualizado', `${nombre} actualizado corretamente`, 'success');
        }
      );
    } else {
      this.medicoService.crearMedico(this.medicoForm.value).subscribe(
        resp => {
          Swal.fire('Medico creado', `${nombre} creado corretamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        }
      );
    }
  }


}
