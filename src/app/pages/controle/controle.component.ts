import { SaldoGeral } from './saldogeral';
import { SaldoCarteira } from './saldocarteira';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EndPointApi } from '../../@core/database/endPointApi.service';
import {UtilService} from "../../@core/utils/util.service";

@Component({
  selector: 'ngx-controle',
  templateUrl: './controle.component.html',
  styleUrls: [ './controle.component.scss' ],
})
export class ControleComponent implements OnInit {
  readonly apiURL: string;
  public title = 'PersonWallet';
  public dadosSaldo!: SaldoGeral;
  public saldoCarteira!: SaldoCarteira;
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

  constructor(private http: HttpClient) {
      this.endPoint = EndPointApi.saldoslist;
      this.endPointCarteirasSaldo = EndPointApi.carteirassaldo;
  }

  ngOnInit() {
     const currentTime = new Date();
     this.anoref = currentTime.getFullYear().toString();
     this.mesref = UtilService.zeroesq((currentTime.getMonth() + 1).toString(), 2);

     this.onPesquisaSaldos();
     this.onPesquisaSaldoCarteira();
  }

  onPesquisaSaldos() {
   this.onsearch = true;
   this.http.get<SaldoGeral>(
      this.endPoint  + '/' +  this.anoref + '/' + this.mesref)
   .subscribe((resultado) => {
       this.dadosSaldo = resultado;
       /*this.onsearch = false;*/
   });
  }

   onPesquisaSaldoCarteira() {
      this.onsearch = true;
      this.http.get<SaldoCarteira>(
         this.endPointCarteirasSaldo)
         .subscribe((resultado) => {
            this.saldoCarteira = resultado;
            /*this.onsearch = false;*/
         });
   }
}
