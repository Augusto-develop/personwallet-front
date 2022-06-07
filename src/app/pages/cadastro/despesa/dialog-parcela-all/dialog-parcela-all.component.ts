import {Component} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
   selector: 'ngx-dialog-parcela-all',
   templateUrl: './dialog-parcela-all.component.html',
   styleUrls: ['./dialog-parcela-all.component.scss'],
})
export class DialogParcelaAllComponent {

   constructor(protected ref: NbDialogRef<DialogParcelaAllComponent>) {


   }

   cancel() {
      this.ref.close('CANCEL');
   }

   single() {
      this.ref.close('SINGLE');
   }

   all() {
      this.ref.close('ALL');
   }

}
