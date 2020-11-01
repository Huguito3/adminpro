// import { environment } from '../../environments/environment.prod';

// const base_url = environment.base_url;

interface HospitalUser {
  _id: string;
  nombre: string;
  image: string;
}

export class Hospital {
  constructor(
    public nombre: string,
    public image?: string,
    public usuario?: HospitalUser,
    public _id?: string
  ) { }

}
