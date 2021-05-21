import { Categoria } from './categoria.service';
import { Carteira } from './carteira.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Fatura } from './fatura.service';

export class Despesa {
  id: string;
  fatura: string;
  anofat: string;
  mesfat: string;
  descricao: string;
  categoria: string;
  numparc: string;
  qtdeparc: string;
  vencimento: string;
  valor: string;
  fixa: string;
  innerfatura: Fatura;
  innercategoria: Categoria;
}

@Injectable({
  providedIn: 'root',
})
export class DespesaService {

  endPoint = 'http://localhost:8081/despesas';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  public despesas!: Despesa;

  /*httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };*/

  getDespesas(fatura, mesref, anoref): Observable<Despesa[]> {
    return this.httpClient.get<Despesa[]>(this.endPoint + '/list/' + fatura + '/' + mesref + '/' + anoref)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  /*getDespesas() {
    this.httpClient.get<any[]>(this.endPoint + '/list');*/

    /*.pipe(
      retry(1),
      catchError(this.httpError),
    );*/
  /*}*/

  getUser(id): Observable<Despesa> {
    return this.httpClient.get<Despesa>(this.endPoint + '/get/' + id)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  save(employee): Observable<Despesa> {
    return this.httpClient.post<Despesa>(this.endPoint + '/add', employee, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  /*save(employee) {
    this.httpClient.post(this.endPoint + '/add', employee, this.httpOptions)
    .subscribe(() => {}, err => console.error(err));
  }*/

  update(id, data): Observable<Despesa> {
    return this.httpClient.put<Despesa>(this.endPoint + '/alter/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  delete(id) {
    return this.httpClient.delete<Despesa>(this.endPoint + '/delete/' + id, this.httpOptions)
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
