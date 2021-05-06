import { Component } from '@angular/core';
import { Conta } from '../conta';
import { FATURAS } from '../data-faturas';
import { Fatura } from '../fatura';

@Component({
  selector: 'app-cardfaturas',
  styleUrls: ['./cardfaturas.component.css'],
  templateUrl: './cardfaturas.component.html',
})

export class CardfaturasComponent {

   public faturas = FATURAS;
   public contas: Conta[];
   public selectedItem: Fatura;

  constructor() {}

  public onSelect(fatura: Fatura): void {
    this.contas = fatura.contas;
    this.selectedItem = fatura;
  }
}
