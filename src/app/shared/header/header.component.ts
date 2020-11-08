import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = usuarioService.usuario;
  }


  buscar(txtTermino: string): void {
    if (txtTermino.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${txtTermino}`);
  }


  logout(): void {
    this.usuarioService.logout();
  }
}
