import {Carteira} from './carteira.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {EndPointApi} from './endPointApi.service';
import {NbAuthService, NbAuthToken} from '@nebular/auth';

export class Produto {
   id: string;
   descricao: string;
   subcategoria: string;
   subcategoriadescr: string;
}

@Injectable({
   providedIn: 'root',
})
export class ProdutoService {
   endPoint = EndPointApi.produtos;
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

   public produtos!: Produto;

   getProdutos(): Observable<Produto[]> {
      return this.httpClient.get<Produto[]>(this.endPoint, this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   getUser(id): Observable<Produto> {
      return this.httpClient.get<Produto>(this.endPoint + '/' + id, this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   save(employee): Observable<Produto> {
      return this.httpClient.post<Produto>(this.endPoint, employee, this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   update(id, data): Observable<Produto> {
      return this.httpClient.put<Produto>(this.endPoint + '/' + id, JSON.stringify(data), this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   delete(id) {
      return this.httpClient.delete<Produto>(this.endPoint + '/' + id, this.httpOptions)
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
