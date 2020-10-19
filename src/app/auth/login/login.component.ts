import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

// como gapi viene de un script (declarado en el index html.apis.google.com...).
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService, private ngZone: NgZone) { }
  ngOnInit(): void {
    this.renderButton();
  }

  login(): void {
    this.formSubmitted = true;
    console.log(this.loginForm.invalid);
    if (this.loginForm.invalid) {
      return;
    }
    this.usuarioService.loginUsuario(this.loginForm.value).subscribe(resp => {
      console.log('usuario logado');
      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
      // console.warn(err.error.msg);
    });
  }


  renderButton(): void {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      // 'onsuccess': this.onSuccess,
      // 'onfailure': this.onFailure
    });
    this.startApp();
  }

  async startApp() {
    // gapi.load('auth2', () => {
    //   // Retrieve the singleton for the GoogleAuth library and set up the client.
    //   this.auth2 = gapi.auth2.init({
    //     client_id: '929781593044-08t7fgr5dcmefue96p2oim131ptg3st8.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin',
    //     // Request scopes in addition to 'profile' and 'email'
    //     //scope: 'additional_scope'
    //   });
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));

  }

  attachSignin(element): void {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        console.log(googleUser.getBasicProfile().getName());
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe(
          resp => {
            // colocamos aqui el navigate porque es una respuesta asincrona
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            });
          }
        );
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}
