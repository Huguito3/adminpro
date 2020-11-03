import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): any {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  cargarMedicos() {
    return this.http.get(`${base_url}/medicos`, this.headers).pipe(
      map((resp: any) => {
        return resp.medicos;
      })
    );
  }

  crearMedico(medico: Medico): Observable<any> {
    return this.http.post(`${base_url}/medicos`, medico, this.headers);
  }

  actualizarMedicos(medico: Medico): Observable<any> {
    return this.http.put(`${base_url}/medicos/${medico._id}`, medico, this.headers);
  }

  borrarMedicos(medico: Medico): Observable<any> {
    return this.http.delete(`${base_url}/medicos/${medico._id}`, this.headers);
  }
}
