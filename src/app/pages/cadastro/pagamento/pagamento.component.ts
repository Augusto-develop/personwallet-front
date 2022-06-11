import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Receita, ReceitaService} from '../../../@core/database/receita.service';
import {NbThemeService} from '@nebular/theme';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Fatura, FaturaService} from '../../../@core/database/fatura.service';
import {UtilService} from '../../../@core/utils/util.service';
import {FormControl} from '@angular/forms';
import {Carteira, CarteiraService} from '../../../@core/database/carteira.service';
import { FormBuilder } from '@angular/forms';
import {Pagamento, PagamentoService} from '../../../@core/database/pagamento.service';

@Component({
   selector: 'ngx-pagamento',
   templateUrl: './pagamento.component.html',
   styleUrls: ['./pagamento.component.scss',
      '../../../../assets/flatable/bower_components/bootstrap/css/bootstrap.css',
      '../../../../assets/flatable/icon/themify-icons/themify-icons.css',
      '../../../../assets/flatable/icon/icofont/css/icofont.css',
      '../../../../assets/flatable/css/style.css',
      '../../../../assets/flatable/css/linearicons.css',
      '../../../../assets/flatable/css/simple-line-icons.css',
      '../../../../assets/flatable/css/ionicons.css',
      '../../../../assets/flatable/icon/material-design/css/material-design-iconic-font.min.css',
      '../../forms/form-layouts/form-layouts.component.scss',
      '../../forms/form-inputs/material-inputs/material-inputs.component.scss'],
})
export class PagamentoComponent implements OnInit {

   faturaoption = '';
   anoref = '0';
   mesref = '0';
   faturasSelect: Fatura[];
   mesesSelect = [];
   carteirasSelect: Carteira[];
   checkoutForm = this.formBuilder.group({
      fatura: '',
      anofat: '',
      mesfat: '',
      datapg: new FormControl(new Date().toISOString()),
      valor: '',
      carteira: '',
   });

   constructor(private receitaService: ReceitaService, private readonly themeService: NbThemeService,
      private faturaService: FaturaService, private carteiraService: CarteiraService,
               private formBuilder: FormBuilder, private pagamentoService: PagamentoService) {
      /*this.listReceitas()*/

      faturaService.getFaturas().subscribe((resultado: Fatura[]) => {
         this.faturasSelect = resultado;
      });

      carteiraService.getCarteiras().subscribe((resultado: Carteira[]) => {
         this.carteirasSelect = resultado;
      });

      this.mesesSelect = UtilService.getMesesSelect();
   }

   public materialTheme$: Observable<boolean>;
   public starRate: number = 2;
   public heartRate: number = 4;
   public radioGroupValue: string = 'This is value 2';
   public showMaterialInputs = false;

   ngOnInit() {
      const currentTime = new Date();
      this.anoref = currentTime.getFullYear().toString();
      this.mesref = UtilService.zeroesq((currentTime.getMonth() + 1).toString(), 2);

      this.materialTheme$ = this.themeService.onThemeChange()
         .pipe(tap(theme => {
            const themeName: string = theme?.name || '';
            this.showMaterialInputs = themeName.startsWith('material');
         }));
   }

   onSubmit(): void {
      /*console.warn('Your order has been submitted', this.checkoutForm.value);
      this.checkoutForm.reset();*/

      this.pagamentoService.save(this.checkoutForm.value).subscribe((result: Pagamento) => {
         window.alert('Pagamento Efetuado');
      }, err => console.error(err));
   }

   diasPagamento = [];

   pag1 = [];
   pag2 = [];
   resultGetReceitas: Receita[];

   // drop(event: CdkDragDrop<string[]>) {
   //    if (event.previousContainer === event.container) {
   //       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
   //    } else {
   //       transferArrayItem(event.previousContainer.data,
   //          event.container.data,
   //          event.previousIndex,
   //          event.currentIndex);
   //    }
   // }

   listReceitas() {
      this.receitaService.getReceitasPorData('05', '2021').subscribe((resultado: Receita[]) => {
         this.resultGetReceitas = resultado;
         const listReceitas = [];
         /*let calcTotalReceitas = 0;*/
         Array.from(this.resultGetReceitas).forEach(element => {

            this.diasPagamento.push({
               'datareceb': element.datareceb,
               'listfat': [],
            });

            /*calcTotalReceitas += UtilService.converteMoedaFloat(element.valor);*/
         });
         /*this.source.load(listReceitas);
         this.totalReceitas = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
         .format(calcTotalReceitas);*/
      });
   }
}
