

import { BusquedasService } from './../../../services/busquedas.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios = 0;
  public usuarios: Usuario[];
  public usuariosTemp: Usuario[];
  public desde = 0;
  public cargando = true;
  public usuarioLogado: Usuario;
  public imgSubs: Subscription;
  constructor(private usuarioService: UsuarioService, private busquedaUsuarios: BusquedasService,
              private modalService: ModalImagenService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioService.usuario;
    this.cargarUsuarios();
    this.imgSubs = this.modalService.nuevaImagen.pipe(delay(1000)).subscribe(img => {
      this.cargarUsuarios();
    });
  }

  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(
      ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      }
    );
  }

  buscar(termino: string): any {

    if (termino.length === 0) {

      return this.usuarios = this.usuariosTemp;

    }
    this.busquedaUsuarios.buscarUsuarios('usuarios', termino).subscribe(
      resultados => {
        this.usuarios = resultados;
      }
    );
  }

  eliminarUsuario(usuario: Usuario): any {

    if (usuario.uid === this.usuarioLogado.uid) {
      return Swal.fire(
        'Error!',
        'No se puede borrar el usuario logado',
        'error'
      );
    }

    Swal.fire({
      title: 'Borrar Usuario?',
      text: `Seguro que queires borrar el usuario: ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe(
          resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado!',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            );
          }
        );
      }
    });
  }

  cambiarRole(usuario: Usuario): void {
    this.usuarioService.guardarUsuario(usuario).subscribe(
      resp => {
        console.log(resp);

      }
    );
  }

  abrirModal(usuario: Usuario): void {
    this.modalService.abrirModal('usuarios', usuario.uid, usuario.image);
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
