import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private ocultarModalvalue = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(): boolean {
    return this.ocultarModalvalue;
  }

  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img: string = 'no-img'): void {
    this.tipo = tipo;
    this.id = id;
    this.img = img;
    this.ocultarModalvalue = false;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }
  cerrarModal(): void {
    this.ocultarModalvalue = true;
  }
  constructor() { }
}
