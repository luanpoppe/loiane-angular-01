import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  cursos: string[] = ['Angular 2', 'Java', 'PhoneGap'];

  constructor() {
    console.log('Cursos Service');
  }

  getCursos() {
    return this.cursos;
  }

  addCurso(curso: string) {
    this.cursos.push(curso);
  }
}
