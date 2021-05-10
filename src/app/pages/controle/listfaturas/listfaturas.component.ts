import { Component, OnInit } from '@angular/core';
import { Conta } from '../conta';
import { FATURAS } from '../data-faturas';
import { Fatura } from '../fatura';

@Component({
  selector: 'ngx-listfaturas',
  templateUrl: './listfaturas.component.html',
  styleUrls: [
    './listfaturas.component.scss',
    '../../../../assets/flatable/bower_components/bootstrap/css/bootstrap.css',
    '../../../../assets/flatable/icon/themify-icons/themify-icons.css',
    '../../../../assets/flatable/icon/icofont/css/icofont.css',
    '../../../../assets/flatable/css/style.css',
    '../../../../assets/flatable/css/linearicons.css',
    '../../../../assets/flatable/css/simple-line-icons.css',
    '../../../../assets/flatable/css/ionicons.css',
    '../../../../assets/flatable/icon/material-design/css/material-design-iconic-font.min.css',
  ],
})
export class ListfaturasComponent {

  public faturas = FATURAS;
   public contas: Conta[] | undefined;
   public selectedItem: Fatura | undefined;
   public animal!: string;
   public name!: string;

   constructor() {}

  public onSelect(fatura: Fatura): void {
    this.contas = fatura.contas;
    this.selectedItem = fatura;
  }
}
