import { tap, take, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export class CrudService<T> {
  constructor(public http: HttpClient, protected API_URL) {}

  list() {
    return this.http.get<T[]>(this.API_URL).pipe(tap(console.log), delay(500));
  }

  create(record) {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

  loadById(id) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  update(record: T) {
    return this.http
      .put(`${this.API_URL}/${record['id']}`, record)
      .pipe(take(1));
  }

  save(record: T) {
    if (record['id']) {
      return this.update(record);
    }

    return this.create(record);
  }

  remove(id) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
