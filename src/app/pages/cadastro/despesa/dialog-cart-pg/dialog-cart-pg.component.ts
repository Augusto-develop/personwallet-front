import {Component} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {Carteira, CarteiraService} from '../../../../@core/database/carteira.service';

@Component({
   selector: 'ngx-dialog-cart-pg',
   templateUrl: 'dialog-cart-pg.component.html',
   styleUrls: ['dialog-cart-pg.component.scss'],
})
export class DialogCartPgComponent {
   carteirasSelect: Carteira[];

   constructor(protected ref: NbDialogRef<DialogCartPgComponent>, private carteiraService: CarteiraService) {

      carteiraService.getCarteiras().subscribe((resultado: Carteira[]) => {
         this.carteirasSelect = resultado;
      });
   }

   cancel() {
      this.ref.close('CANCEL');
   }

   submit(carteira) {
      this.ref.close(carteira);
   }


}
