import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // vamos a mandarlo usando javascript fetch async
  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ): Promise<any> {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      const data = await resp.json();
      if (data.ok) {
        return data.nombreArchivo;
      } else {
        return false;
      }
      return 'nombre de la imagen';
    } catch (error) {
      console.log(`Problema al cargar el archivo: ${error}`);

      return false;
    }
  }
}
