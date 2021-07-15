import { SaldoGeral } from './saldogeral';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EndPointApi } from '../../@core/database/endPointApi.service';

@Component({
  selector: 'ngx-controle',
  templateUrl: './controle.component.html',
  styleUrls: [ './controle.component.scss' ],
})
export class ControleComponent implements OnInit {
  readonly apiURL: string;
  public title = 'PersonWallet';
  public dadosSaldo!: SaldoGeral;
  public iconSaldo = 'icofont icofont-wallet';
  public iconReceita = 'zmdi zmdi-trending-up';
  public iconDespesa = 'zmdi zmdi-trending-down';
  public titleSaldo = 'Saldo';
  public titleReceita = 'Receitas';
  public titleDespesa = 'Despesas';

  public mesref: string = '07';
  public anoref: string = '2021';
  public onsearch: boolean = false;

  public endPoint = '';

  constructor(private http: HttpClient) {
      this.endPoint = EndPointApi.saldoslist;
      this.onPesquisaSaldos();
  }

  ngOnInit() {

  }

  onPesquisaSaldos() {
   this.onsearch = true;
   this.http.get<SaldoGeral>(
      this.endPoint + this.anoref + '/' + this.mesref)
   .subscribe((resultado) => {
       this.dadosSaldo = resultado;
       this.onsearch = false;
   });
  }
}
