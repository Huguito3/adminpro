import { environment } from './../../environments/environment.prod';

const base_url = environment.base_url;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public image?: string,
    public role?: string,
    public uid?: string
  ) { }

  get imagenUrl(): string {
    if (this.image && this.image.includes('https')) {
      return this.image;
    }

    if (this.image) {
      return `${base_url}/upload/usuarios/${this.image}`;
    }
    return `${base_url}/upload/usuarios/no-image`;
  }
}
