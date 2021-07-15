import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { EndPointApi } from './endPointApi.service';

export class Categoria {
  id: string;
  descricao: string;
  /*email: string;
  phone: number;*/
}

@Injectable({
  providedIn: 'root',
})

export class CategoriaService {
  endPoint = EndPointApi.categorias;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  public categorias!: Categoria;

  /*httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };*/

  getCategorias(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.endPoint + '/list')
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  /*getCategorias() {
    this.httpClient.get<any[]>(this.endPoint + '/list');*/

    /*.pipe(
      retry(1),
      catchError(this.httpError),
    );*/
  /*}*/

  getUser(id): Observable<Categoria> {
    return this.httpClient.get<Categoria>(this.endPoint + '/get/' + id)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  save(employee): Observable<Categoria> {
    return this.httpClient.post<Categoria>(this.endPoint + '/add', employee, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  /*save(employee) {
    this.httpClient.post(this.endPoint + '/add', employee, this.httpOptions)
    .subscribe(() => {}, err => console.error(err));
  }*/

  update(id, data): Observable<Categoria> {
    return this.httpClient.put<Categoria>(this.endPoint + '/alter/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  delete(id) {
    return this.httpClient.delete<Categoria>(this.endPoint + '/delete/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  httpError(error) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // tslint:disable-next-line: no-console
    console.log(msg);
    return throwError(msg);
  }
}
