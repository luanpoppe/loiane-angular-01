import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  emitirCursoCriado = new EventEmitter<string>();

  cursos: string[] = ['Angular 2', 'Java', 'PhoneGap'];

  constructor() {
    console.log('Cursos Service');
  }

  getCursos() {
    return this.cursos;
  }

  addCurso(curso: string) {
    this.cursos.push(curso);
    this.emitirCursoCriado.emit(curso);
  }
}
