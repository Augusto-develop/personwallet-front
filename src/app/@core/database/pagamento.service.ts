import { Categoria } from './categoria.service';
import { Carteira } from './carteira.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Fatura } from './fatura.service';
import { EndPointApi } from './endPointApi.service';
import {NbAuthService, NbAuthToken} from "@nebular/auth";

export class Pagamento {
  id: string;
  fatura: string;
  anofat: string;
  mesfat: string;
  datapg: string;
  carteira: string;
  valor: string;
}

@Injectable({
  providedIn: 'root',
})
export class PagamentoService {
  endPoint = EndPointApi.pagamentos;

   httpOptions = {
      headers: {
         'Content-Type': 'application/json; charset=utf-8',
         'Authorization': '',
      },
   };

   constructor(private httpClient: HttpClient, private authService: NbAuthService) {
      this.authService.getToken()
         .subscribe((token: NbAuthToken) => {
            if (token.isValid()) {
               this.httpOptions.headers.Authorization = 'Bearer ' + token;
            }
         });
   }

  save(employee): Observable<Pagamento> {
    return this.httpClient.post<Pagamento>(this.endPoint, employee, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.httpError));
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
