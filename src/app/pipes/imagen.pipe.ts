import { Pipe, PipeTransform } from '@angular/core';
import { environment } from './../../environments/environment.prod';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  // pipe sirve para transformar como muestro visualmente la informacion
  transform(image: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {


    if (!image) {
      return `${base_url}/upload/usuarios/no-image`;
    } else if (image.includes('https')) {
      return image;
    } else if (image) {
      return `${base_url}/upload/${tipo}/${image}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }
  }

}
