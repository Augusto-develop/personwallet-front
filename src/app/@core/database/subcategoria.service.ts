import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {EndPointApi} from './endPointApi.service';
import {NbAuthJWTToken, NbAuthService, NbAuthToken} from '@nebular/auth';

export class Subcategoria {
   id: string;
   descricao: string;
}

@Injectable({
   providedIn: 'root',
})

export class SubcategoriaService {
   endPoint = EndPointApi.subcategorias;
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

   public carteiras!: Subcategoria;


   getSubcategorias(): Observable<Subcategoria[]> {
      return this.httpClient.get<Subcategoria[]>(this.endPoint, this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   getSubcategoria(id): Observable<Subcategoria> {
      return this.httpClient.get<Subcategoria>(this.endPoint + id, this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   save(employee): Observable<Subcategoria> {
      return this.httpClient.post<Subcategoria>(this.endPoint, employee, this.httpOptions)
         .pipe(retry(1), catchError(this.httpError));
   }

   /*'/alter/'*/
   update(id, data): Observable<Subcategoria> {
      return this.httpClient.put<Subcategoria>(this.endPoint + '/' + id, JSON.stringify(data), this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   delete(id) {
      return this.httpClient.delete<Subcategoria>(this.endPoint + '/' + id, this.httpOptions)
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
