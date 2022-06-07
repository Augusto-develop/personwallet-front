import {Component, Input, OnInit} from '@angular/core';
import {Saldo} from '../saldo';

@Component({
   selector: 'ngx-saldogeral',
   templateUrl: './saldogeral.component.html',
   styleUrls: [
      './saldogeral.component.scss',
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
export class SaldogeralComponent implements OnInit {

   @Input() public detalhes: Saldo[] | undefined;
   @Input() public icon: string | undefined;
   @Input() public titulo: string | undefined;
   @Input() public total: string | undefined;

   constructor() {
   }

   ngOnInit(): void {
   }

}
