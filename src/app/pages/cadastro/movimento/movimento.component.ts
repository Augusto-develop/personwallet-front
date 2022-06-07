import { Component, OnInit } from '@angular/core';
import {Carteira, CarteiraService} from '../../../@core/database/carteira.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {NbThemeService} from '@nebular/theme';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Movimento, MovimentoService} from '../../../@core/database/movimento.service';

@Component({
  selector: 'ngx-movimento',
  templateUrl: './movimento.component.html',
  styleUrls: ['./movimento.component.scss'],
})
export class MovimentoComponent implements OnInit {

   cartCredOption = '';
   cartDebOption = '';
   carteirasSelect: Carteira[];
   checkoutForm = this.formBuilder.group({
      cartdebito: '',
      cartcredito: '',
      ocorrencia: new FormControl(new Date().toISOString()),
      valor: '',
   });

  constructor(private carteiraService: CarteiraService, private movimentoService: MovimentoService,
              private formBuilder: FormBuilder, private readonly themeService: NbThemeService) {
     carteiraService.getCarteiras().subscribe((resultado: Carteira[]) => {
        this.carteirasSelect = resultado;
     });
  }

   public materialTheme$: Observable<boolean>;
   public starRate: number = 2;
   public heartRate: number = 4;
   public radioGroupValue: string = 'This is value 2';
   public showMaterialInputs = false;

  ngOnInit(): void {
     this.materialTheme$ = this.themeService.onThemeChange()
        .pipe(tap(theme => {
           const themeName: string = theme?.name || '';
           this.showMaterialInputs = themeName.startsWith('material');
        }));
  }

   onSubmit(): void {
      /*console.warn('Your order has been submitted', this.checkoutForm.value);
      this.checkoutForm.reset();*/

      this.movimentoService.save(this.checkoutForm.value).subscribe((result: Movimento) => {
         window.alert('Transferencia Efetuada');
      }, err => console.error(err));
   }
}
