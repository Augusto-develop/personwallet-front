import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {EndPointApi} from './endPointApi.service';
import {NbAuthService, NbAuthToken} from '@nebular/auth';

export class Fornecedor {
   id: string;
   descricao: string;
}

@Injectable({
   providedIn: 'root',
})

export class FornecedorService {
   endPoint = EndPointApi.fornecedores;
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

   public fornecedores!: Fornecedor;

   getFornecedores(): Observable<Fornecedor[]> {
      return this.httpClient.get<Fornecedor[]>(this.endPoint, this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   save(employee): Observable<Fornecedor> {
      return this.httpClient.post<Fornecedor>(this.endPoint, employee, this.httpOptions)
         .pipe(retry(1), catchError(this.httpError));
   }

   update(id, data): Observable<Fornecedor> {
      return this.httpClient.put<Fornecedor>(this.endPoint + '/' + id, JSON.stringify(data), this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   delete(id) {
      return this.httpClient.delete<Fornecedor>(this.endPoint + '/' + id, this.httpOptions)
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
