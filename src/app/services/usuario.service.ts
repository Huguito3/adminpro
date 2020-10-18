import { LoginForm } from './../interfaces/login-form.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { RegisterForm } from './../interfaces/register-form.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario(formdata: RegisterForm): Observable<any> {
    console.log('creando usuario');
    return this.http.post(`${base_url}/usuarios`, formdata).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.msg);
      })
    );

  }

  loginUsuario(formdata: LoginForm): Observable<any> {
    console.log('logando usuario');
    return this.http.post(`${base_url}/login`, formdata).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.msg);
      })
    );

  }
}
