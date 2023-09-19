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
}
