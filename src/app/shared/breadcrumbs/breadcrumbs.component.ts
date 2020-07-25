import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  titulo: string;
  tituloSubs$: Subscription;
  constructor(private router: Router, private route: ActivatedRoute) {
    // con el activated route tambien se podria pero hay que tener cuidado porque le snap´shot nos da el titulo de la primera vez
    // para hacerlo habria que subscribuirse a lso hijos
    // this.router.events.subscribe(event => { console.log(event); });
    this.tituloSubs$ = this.getArgumentosRuta().subscribe(({ titulo }) => {
      // Arriba es destructuracion, ({titulo}) -> si colocamos (data), data es un objeto que adentro tiene
      // una propiedad titulo, con eso ya la obtenemso directamente
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
    });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }


  getArgumentosRuta(): Observable<any> {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data),
    );
  }
}
