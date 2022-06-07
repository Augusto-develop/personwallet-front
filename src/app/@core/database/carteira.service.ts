import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {EndPointApi} from './endPointApi.service';
import {NbAuthJWTToken, NbAuthService, NbAuthToken} from "@nebular/auth";

export class Carteira {
   id: string;
   descricao: string;
   ativo: boolean;
   /*email: string;
   phone: number;*/
}

@Injectable({
   providedIn: 'root',
})

export class CarteiraService {
   endPoint = EndPointApi.carteiras;
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

   public carteiras!: Carteira;


   getCarteiras(): Observable<Carteira[]> {
      return this.httpClient.get<Carteira[]>(this.endPoint /*+ '/list'*/, this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   /*getCarteiras() {
     this.httpClient.get<any[]>(this.endPoint + '/list');*/

   /*.pipe(
     retry(1),
     catchError(this.httpError),
   );*/

   /*}*/

   getCarteira(id): Observable<Carteira> {
      return this.httpClient.get<Carteira>(this.endPoint + '/get/' + id, this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   save(employee): Observable<Carteira> {
      return this.httpClient.post<Carteira>(this.endPoint /*+ '/add'*/, employee, this.httpOptions)
         .pipe(retry(1), catchError(this.httpError));
   }

   /*save(employee) {
     this.httpClient.post(this.endPoint + '/add', employee, this.httpOptions)
     .subscribe(() => {}, err => console.error(err));
   }*/

   /*'/alter/'*/
   update(id, data): Observable<Carteira> {
      return this.httpClient.put<Carteira>(this.endPoint + '/' + id, JSON.stringify(data), this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   delete(id) {
      return this.httpClient.delete<Carteira>(this.endPoint + /*'/delete/'*/ '/' + id, this.httpOptions)
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
