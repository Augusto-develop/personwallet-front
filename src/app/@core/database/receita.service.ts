import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {EndPointApi} from './endPointApi.service';
import {NbAuthService, NbAuthToken} from '@nebular/auth';

export class Receita {
   id: string;
   carteira: string;
   carteiradescr: string;
   descricao: string;
   datareceb: string;
   valor: string;
   fixa: string;
}

@Injectable({
   providedIn: 'root',
})
export class ReceitaService {
   endPoint = EndPointApi.receitas;
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

   public receitas!: Receita;

   /*httpHeader = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json; charset=utf-8',
     }),
   };*/

   getReceitas(mesref, anoref): Observable<Receita[]> {
      return this.httpClient.get<Receita[]>(this.endPoint + '/' + mesref + '/' + anoref, this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   getReceitasPorData(mesref, anoref): Observable<Receita[]> {
      return this.httpClient.get<Receita[]>(this.endPoint + '/dias/' + mesref + '/' + anoref, this.httpOptions)
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
      return this.httpClient.get<Receita>(this.endPoint + '/' + id, this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   save(employee): Observable<Receita> {
      return this.httpClient.post<Receita>(this.endPoint, employee, this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   /*save(employee) {
     this.httpClient.post(this.endPoint + '/add', employee, this.httpOptions)
     .subscribe(() => {}, err => console.error(err));
   }*/

   update(id, data): Observable<Receita> {
      return this.httpClient.put<Receita>(this.endPoint + '/' + id, JSON.stringify(data), this.httpOptions)
         .pipe(
            retry(1),
            catchError(this.httpError),
         );
   }

   delete(id) {
      return this.httpClient.delete<Receita>(this.endPoint + '/' + id, this.httpOptions)
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
