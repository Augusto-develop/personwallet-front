import { SaldoGeral } from './saldogeral';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly apiURL: string;
  public title = 'PersonWallet';
  public dadosSaldo: SaldoGeral;
  public iconSaldo = 'icofont icofont-wallet';
  public iconReceita = 'zmdi zmdi-trending-up';
  public iconDespesa = 'zmdi zmdi-trending-down';
  public titleSaldo = 'Saldo';
  public titleReceita = 'Receitas';
  public titleDespesa = 'Despesas';

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:8081'; 
    
    this.http.get<SaldoGeral>(`http://localhost:8081/saldos/list`)
      .subscribe((resultado) => {
          this.dadosSaldo = resultado;       
      });
  }

  ngOnInit() {
   
  } 
}
