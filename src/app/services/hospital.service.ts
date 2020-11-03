import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales() {
    return this.http.get(`${base_url}/hospital`, this.headers).pipe(
      map((resp: any) => {

        return resp.hospitales;
      })
    );
    // .pipe(
    //   map(
    //     (resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales)
    //   );
  }

  crearHospitales(nombre: string): Observable<any> {
    return this.http.post(`${base_url}/hospital`, {nombre}, this.headers);
  }

  actualizarHospitales(id: string, nombre: string): Observable<any> {
    return this.http.put(`${base_url}/hospital/${id}`, {nombre}, this.headers);
  }

  borrarHospitales(id: string): Observable<any> {
    return this.http.delete(`${base_url}/hospital/${id}`, this.headers);
  }

}
