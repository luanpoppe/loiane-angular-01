import { Injectable, EventEmitter } from '@angular/core';
import { LogService } from '../shared/log.service';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  emitirCursoCriado = new EventEmitter<string>();

  cursos: string[] = ['Angular 2', 'Java', 'PhoneGap'];

  constructor(private logService: LogService) {
    console.log('Cursos Service');
  }

  getCursos() {
    this.logService.consoleLog('Obtendo lista de cursos');
    return this.cursos;
  }

  addCurso(curso: string) {
    this.logService.consoleLog(`Criando um novo curso ${curso}`);
    this.cursos.push(curso);
    this.emitirCursoCriado.emit(curso);
  }
}
