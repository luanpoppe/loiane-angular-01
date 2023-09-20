import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { EstadoBr } from '../models/estado-br.model';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEstadoBr() {
    return this.http.get('assets/dados/estadosbr.json').pipe(map((res) => res));
  }

  getCidades(idEstado: number) {
    return this.http.get('assets/dados/cidades.json').pipe(
      map((res) => res),
      map((cidades: any) => cidades.filter((c: any) => c.estado == idEstado))
    );
  }

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sn' },
    ];
  }

  getTecnologias() {
    return [
      { nome: 'java', desc: 'Java' },
      { nome: 'javascript', desc: 'JavaScript' },
      { nome: 'php', desc: 'PHP' },
      { nome: 'ruby', desc: 'Ruby' },
    ];
  }

  getNewsletter() {
    return [
      {
        valor: 's',
        desc: 'Sim',
      },
      {
        valor: 'n',
        desc: 'Não',
      },
    ];
  }
}
