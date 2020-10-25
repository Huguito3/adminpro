import { Usuario } from './../models/usuario.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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

  buscarUsuarios(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string): Observable<any> {

    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.data);
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
