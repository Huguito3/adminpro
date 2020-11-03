import { Hospital, HospitalUser } from './hospital.model';
import { Usuario } from './usuario.model';

interface UsuarioUser {
  _id: string;
  nombre: string;
  image: string;
}


export class Medico {
  constructor(
    public nombre: string,
    public usuario?: UsuarioUser,
    public hospital?: HospitalUser,
    public image?: string,
    public _id?: string
  ) { }
}

