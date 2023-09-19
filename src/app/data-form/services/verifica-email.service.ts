import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerificaEmailService {
  constructor(private http: HttpClient) {}

  verificarEmail(email: string) {
    const http2 = this.http
      .get('assets/dados/verificarEmail.json')
      .pipe(map((dados: any) => dados.emails));

    const http3 = http2.pipe(
      map((dados) => dados.filter((v: any) => v.email === email))
    );

    const http4 = http3.pipe(map((dados) => dados.length > 0));

    return http4;
  }
}
