import { environment } from './../../environments/environment';

const base_url = environment.base_url;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public image?: string,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public uid?: string
  ) { }

  // con el pipe creado este metodo no es mas necesario
  get imagenUrl(): string {

    if (!this.image) {
      return `${base_url}/upload/usuarios/no-image`;
    } else if (this.image.includes('https')) {
      return this.image;
    } else if (this.image) {
      return `${base_url}/upload/usuarios/${this.image}`;
    }
    return `${base_url}/upload/usuarios/no-image`;
  }
}
