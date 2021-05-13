import { Carteira } from './carteira.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class Receita {
  id: string;
  carteira: string;
  descricao: string;
  datareceb: string;
  valor: string;
  fixa: string;
  innercarteira: Carteira;
}

@Injectable({
  providedIn: 'root',
})
export class ReceitaService {

  endPoint = 'http://localhost:8081/receitas';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  public receitas!: Receita;

  /*httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };*/

  getReceitas(): Observable<Receita[]> {
    return this.httpClient.get<Receita[]>(this.endPoint + '/list')
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  /*getReceitas() {
    this.httpClient.get<any[]>(this.endPoint + '/list');*/

    /*.pipe(
      retry(1),
      catchError(this.httpError),
    );*/
  /*}*/

  getUser(id): Observable<Receita> {
    return this.httpClient.get<Receita>(this.endPoint + '/get/' + id)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  save(employee): Observable<Receita> {
    return this.httpClient.post<Receita>(this.endPoint + '/add', employee, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  /*save(employee) {
    this.httpClient.post(this.endPoint + '/add', employee, this.httpOptions)
    .subscribe(() => {}, err => console.error(err));
  }*/

  update(id, data): Observable<Receita> {
    return this.httpClient.put<Receita>(this.endPoint + '/alter/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  delete(id) {
    return this.httpClient.delete<Receita>(this.endPoint + '/delete/' + id, this.httpOptions)
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
