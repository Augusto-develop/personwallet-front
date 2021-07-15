import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class Fatura {
  id: string;
  descricao: string;
  diavenc: string;
  limite: string;
  cartao: string;
  valor: string;
}

export class FaturaFechada {
  id: string;
  descricao: string;
  mesfat: string;
  anofat: string;
  dia: string;
  valor: string;
  pago: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class FaturaService {

  endPoint = 'http://localhost:8081/faturas';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  public faturas!: Fatura;

  getFaturas(): Observable<Fatura[]> {
    return this.httpClient.get<Fatura[]>(this.endPoint)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  getExtrato(mes, ano): Observable<FaturaFechada[]> {
    return this.httpClient.get<FaturaFechada[]>(this.endPoint + '/' + mes + '/' + ano)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  /*getUser(id): Observable<Fatura> {
    return this.httpClient.get<Fatura>(this.endPoint + '/get/' + id)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }*/

  save(employee): Observable<Fatura> {
    return this.httpClient.post<Fatura>(this.endPoint, employee, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  update(id, data): Observable<Fatura> {
    return this.httpClient.put<Fatura>(this.endPoint + '/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.httpError),
    );
  }

  delete(id) {
    return this.httpClient.delete<Fatura>(this.endPoint + '/' + id, this.httpOptions)
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
