import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];

  cursos$: Observable<Curso[]>;

  constructor(private service: CursosService) {}

  ngOnInit(): void {
    this.cursos$ = this.service.list();
  }
}
