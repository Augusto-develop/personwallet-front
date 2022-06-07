import {SaldoGeral} from './saldogeral';
import {SaldoCarteira} from './saldocarteira';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {EndPointApi} from '../../@core/database/endPointApi.service';
import {UtilService} from '../../@core/utils/util.service';
import {SaldoReceita} from './saldoreceita';
import {SaldoCategoria} from './saldocategoria';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {Fatura, FaturaCartao, FaturaService} from '../../@core/database/fatura.service';
import {Observable} from 'rxjs';

@Component({
   selector: 'ngx-controle',
   templateUrl: './controle.component.html',
   styleUrls: ['./controle.component.scss',
      /*'../../../assets/icons/pwstyle.css'*/],
})
export class ControleComponent implements OnInit {
   readonly apiURL: string;
   public title = 'PersonWallet';
   public saldoCarteira!: SaldoCarteira;
   public saldoReceita!: SaldoReceita;
   public saldoCategoria!: SaldoCategoria;
   public iconSaldo = 'icofont icofont-wallet';
   public iconReceita = 'zmdi zmdi-trending-up';
   public iconDespesa = 'zmdi zmdi-trending-down';
   public titleSaldo = 'Saldo';
   public titleReceita = 'Receitas';
   public titleDespesa = 'Despesas';

   public mesref: string = '0';
   public anoref: string = '0';
   public onsearch: boolean = false;

   public endPoint = '';
   public endPointCarteirasSaldo = '';
   public endPointReceitasSaldo = '';
   public endPointCategoriasSaldo = '';

   listFaturas!: FaturaCartao[];

   httpOptions = {
      headers: {
         'Content-Type': 'application/json; charset=utf-8',
         'Authorization': '',
      },
   };

   showsaldocart: boolean;
   showsaldocategoria: boolean;
   showsaldoreceita: boolean;
   showsaldocartao: boolean;

   constructor(private http: HttpClient, private authService: NbAuthService,
               private faturaService: FaturaService) {
      this.endPoint = EndPointApi.saldoslist;
      this.endPointCarteirasSaldo = EndPointApi.carteirassaldo;
      this.endPointReceitasSaldo = EndPointApi.receitasssaldo;
      this.endPointCategoriasSaldo = EndPointApi.categoriassaldo;

      this.authService.getToken()
         .subscribe((token: NbAuthToken) => {
            if (token.isValid()) {
               this.httpOptions.headers.Authorization = 'Bearer ' + token;
            }
         });
   }

   ngOnInit() {
      this.showsaldocart = false;
      this.showsaldocategoria = false;
      this.showsaldoreceita = false;
      this.showsaldocartao = false;

      const currentTime = new Date();
      this.anoref = currentTime.getFullYear().toString();
      this.mesref = UtilService.zeroesq((currentTime.getMonth() + 1).toString(), 2);
     this.onPesquisaSaldos();
   }

   onPesquisaSaldos() {
      this.onPesquisaFaturas();
      this.onPesquisaSaldoCarteira();
      this.onPesquisaSaldoReceitas();
      this.onPesquisaSaldoCategorias();
   }

   onPesquisaSaldoCarteira() {
      this.onsearch = true;
      this.http.get<SaldoCarteira>(
         this.endPointCarteirasSaldo, this.httpOptions)
         .subscribe((resultado) => {
            this.saldoCarteira = resultado;
            this.onsearch = false;
            this.showsaldocart = true;
         });
   }

   onPesquisaSaldoReceitas() {
      this.http.get<SaldoReceita>(
         this.endPointReceitasSaldo + '/' + this.mesref + '/' + this.anoref, this.httpOptions)
         .subscribe((resultado) => {
            this.saldoReceita = resultado;
            this.showsaldoreceita = true;
         });
   }

   onPesquisaSaldoCategorias() {
      this.http.get<SaldoCategoria>(
         this.endPointCategoriasSaldo + '/' + this.mesref + '/' + this.anoref, this.httpOptions)
         .subscribe((resultado) => {
            this.saldoCategoria = resultado;
            this.showsaldocategoria = true;
         });
   }

   onPesquisaFaturas() {
      this.faturaService.getCartoes().subscribe((resultado: FaturaCartao[]) => {
         const itemsFatura = [];
         Array.from(resultado).forEach(element => {
            switch (element.emissor) {
               case 'NUBANK':
                  element.cardclass = 'card-nubank-roxinho';
                  break;
               case 'C6BANK':
                  element.cardclass = 'card-c6-boreal-forest';
                  break;
               case 'MIDWAY':
                  element.cardclass = 'card-midway-rchilo';
                  break;
               case 'SANTANDER':
                  element.cardclass = 'card-santander-sx';
                  break;
               case 'CAIXA':
                  element.cardclass = 'card-caixa';
                  break;
               case 'ITAU':
                  element.cardclass = 'card-itau';
                  break;
            }
            itemsFatura.push(element);
         });
         this.listFaturas = itemsFatura;
         this.showsaldocartao = true;
      });
   }
}
