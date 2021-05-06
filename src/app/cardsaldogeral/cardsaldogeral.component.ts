import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit  } from '@angular/core';
import { Saldo } from '../saldo';

@Component({
  selector: 'app-cardsaldogeral',
  styleUrls: ['./cardsaldogeral.component.css'],
  templateUrl: './cardsaldogeral.component.html',
})
export class CardsaldogeralComponent {

  @Input() public detalhes: Saldo[];
  @Input() public icon: string;
  @Input() public titulo: string;
  @Input() public total: string;

  constructor() {

  }
}
