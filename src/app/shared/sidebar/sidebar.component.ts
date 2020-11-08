import { Usuario } from './../../models/usuario.model';
import { SideBarService } from './../../services/side-bar.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public usuario: Usuario;
  // menuItems: any[];
  constructor(public sidebarService: SideBarService, private usuarioService: UsuarioService) {
    // this.menuItems = this.sidebar.menu;
    this.usuario = usuarioService.usuario;
  }
  ngOnInit(): void {
  }

}
