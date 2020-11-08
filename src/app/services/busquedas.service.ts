import { Hospital } from './../models/hospital.model';
import { Usuario } from './../models/usuario.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.google, user.image, user.role, user.uid
      ));
  }

  private transformarHospital(resultados: any[]): Hospital[] {
    return resultados.map(
      user => new Hospital(user.nombre, user.image, user.usuario, user._id
      ));
  }

  private transformarMedicos(resultados: any[]): Medico[] {
    return resultados.map(
      user => new Medico(user.nombre, user.usuario, user.hospital, user.image, user._id
      ));
  }

  busquedaGlobal(termino: string): Observable<any> {
    return this.http.get<any[]>(`${base_url}/todo//${termino}`, this.headers);
  }

  buscarUsuarios(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string): Observable<any> {

    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.data);
            break;
          case 'hospitales':
            return this.transformarHospital(resp.data);
            break;
          case 'medicos':
            return this.transformarMedicos(resp.data);
            break;
          default:
            return [];
        }
        return resp.data;
      }
      )
    );
  }
}
