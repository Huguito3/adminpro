import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(
      usuarios => {
        console.log(usuarios);
      });
    //   const promesa = new Promise(
    //     (resolve, reject) => {
    //       console.log('Hola Mundo');
    //       if (false) {
    //         resolve('Hola Mundo correcto');
    //       }else{
    //         reject('Algo salio mal');
    //       }

    //     }
    //   );
    //   promesa.then(
    //     (mensaje) => {
    //       console.log(mensaje);
    //     }
    //   ).catch(
    //     error => console.log('Error en mi promesa', error)
    //   );
    //   console.log('Fin del init');
    // }
  }

  getUsuarios() {
    const promesa = new Promise(
      resolve => {
        // La primera promesa nos retorna lso datos, pero los precisamos pasar para Json.Esa funciona es otra promesa
        // por eso la concatenacion
        fetch('https://reqres.in/api/users').then(
          resp => resp.json()).then(
            body => console.log(body.data)
          );
      }
    );
    return promesa;

  }
}
