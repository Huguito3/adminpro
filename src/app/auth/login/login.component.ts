import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent {

  public formSubmitted = false;
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService) { }

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
        // this.router.navigateByUrl('/');
      }else{
        localStorage.removeItem('email');
      }
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
      // console.warn(err.error.msg);
    });
  }
}
