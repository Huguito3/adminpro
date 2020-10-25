import { Usuario } from './../models/usuario.model';
import { Router } from '@angular/router';
import { LoginForm } from './../interfaces/login-form.interface';
import { Observable, Observer, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { RegisterForm } from './../interfaces/register-form.interface';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;
  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }


  validarToken(): Observable<boolean> {
    // const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, role, uid, image = '' } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', google, image, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }), catchError(
        // el operador of me permite retornar un observable con el valor que le ponemos dentro
        error => of(false)
      ));
  }

  crearUsuario(formdata: RegisterForm): Observable<any> {
    console.log('creando usuario');
    return this.http.post(`${base_url}/usuarios`, formdata).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.msg);
      })
    );

  }

  actualizarPerfil(data: { email: string, nome: string, role: string }): Observable<any> {
    data = {
      ...data,
      role: this.usuario.role
    };
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  loginUsuario(formdata: LoginForm): Observable<any> {
    console.log('logando usuario');
    return this.http.post(`${base_url}/login`, formdata).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.msg);
      })
    );
  }

  loginGoogle(token): Observable<any> {
    console.log('logando usuario GOOGLE');
    console.log(token);

    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {

        localStorage.setItem('token', resp.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      // se utiliza el ng zone porque al llamar auth 2 estoy llamandouna libreria fuera de angular, y el this.router
      // es codigo de nagular, precisa englobar para asegurarnos de que no haya problemas.
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
      console.log('User signed out.');
    });
  }

  googleInit(): Promise<any> {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '929781593044-08t7fgr5dcmefue96p2oim131ptg3st8.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });
        resolve();
      });
    });
  }

}
