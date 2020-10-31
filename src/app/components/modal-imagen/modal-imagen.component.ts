import { ModalImagenService } from './../../services/modal-imagen.service';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  // public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  constructor(public modalService: ModalImagenService, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(): void {
    this.imgTemp = null;
    this.modalService.cerrarModal();
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
    const uid  = this.modalService.id;
    const tipo = this.modalService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, uid).then(
      img => {
        Swal.fire('Guardado', 'Imagen subida con sucesso', 'success');
        this.cerrarModal();
        this.modalService.nuevaImagen.emit(img);
      }
    ).catch(
      error => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      }
    );
  }
}
