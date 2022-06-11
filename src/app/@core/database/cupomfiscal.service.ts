import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {EndPointApi} from './endPointApi.service';
import {NbAuthService, NbAuthToken} from '@nebular/auth';

export class ItemsCupomFiscal {
   descricao: string;
   qtde: string;
   total: string;
}

export class CupomFiscal {
   emissao: string;
   fornecedor: {
      nome: string,
      bairro: string,
      cidade: string,
   };
   itens: ItemsCupomFiscal[];
   pago: string;
}

@Injectable({
   providedIn: 'root',
})
export class CupomfiscalService {
   endPoint = EndPointApi.despesaitems;

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

   getCupomFiscal(chave): Observable<CupomFiscal> {
      return this.httpClient.get<CupomFiscal>(this.endPoint + '/' + chave, this.httpOptions)
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
