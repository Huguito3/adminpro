export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public image?: string,
    public role?: string,
    public uid?: string
  ) {

  }
}
