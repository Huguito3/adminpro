
import { CargarUsuario } from './../interfaces/cargar-usuarios.interface';
import { Usuario } from './../models/usuario.model';
import { Router } from '@angular/router';
import { LoginForm } from './../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
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

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }
  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
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
        localStorage.setItem('menu', JSON.stringify(resp.menu));
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
        localStorage.setItem('menu', JSON.stringify(resp.menu));
      })
    );

  }

  actualizarPerfil(data: { email: string, nome: string, role: string }): Observable<any> {
    data = {
      ...data,
      role: this.usuario.role
    };
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  loginUsuario(formdata: LoginForm): Observable<any> {
    console.log('logando usuario');
    return this.http.post(`${base_url}/login`, formdata).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.msg);
        localStorage.setItem('menu', JSON.stringify(resp.menu));
      })
    );
  }

  cargarUsuarios(desde: number = 0): Observable<any> {
    return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${desde}`, this.headers).pipe(
      map(resp => {

        const usuarios = resp.usuarios.map(
          user => new Usuario(user.nombre, user.email, '', user.google, user.image, user.role, user.uid

          )
        );

        return {
          total: resp.total,
          usuarios
        };
      })
    );
  }

  loginGoogle(token): Observable<any> {
    console.log('logando usuario GOOGLE');
    console.log(token);

    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {

        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
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

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete<any>(`${base_url}/usuarios/${usuario.uid}`, this.headers);
  }

  guardarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

}
