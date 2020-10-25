import { FileUploadService } from './../../services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public profileForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder, private usuService: UsuarioService, private fileUploadService: FileUploadService) {
    this.usuario = usuService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group(
      {
        nombre: [this.usuario.nombre, Validators.required],
        email: [this.usuario.email, [Validators.required, Validators.email]]
      }
    );
  }

  actualizarPerfil(): void {
    this.usuService.actualizarPerfil(this.profileForm.value).subscribe(
      resp => {
        const { nombre, email } = this.profileForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      }
    );
  }
  cambiarImagem(file: File): void {
    this.imagenSubir = file;
    if (!file) {
      this.imgTemp = null;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }
  subirImagen(): void {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid).then(
      img => {
        this.usuario.image = img;
        Swal.fire('Guardado', 'Imagen subida con sucesso', 'success');
      }
    ).catch(
      error => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      }
    );
  }
}
