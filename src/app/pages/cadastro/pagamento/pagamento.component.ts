import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Receita, ReceitaService } from '../../../@core/database/receita.service';

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
  '../../../../assets/flatable/icon/material-design/css/material-design-iconic-font.min.css'],
})
export class PagamentoComponent {
  diasPagamento = [];

  pag1 = [];
  pag2 = [];
  resultGetReceitas: Receita[];

   constructor( private receitaService: ReceitaService) {
      this.listReceitas();
   }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  listReceitas() {
   this.receitaService.getReceitasPorData('05', '2021').subscribe((resultado: Receita[]) => {
     this.resultGetReceitas = resultado;
     const listReceitas = [];
     /*let calcTotalReceitas = 0;*/
     Array.from(this.resultGetReceitas).forEach(element => {

         this.diasPagamento.push({
            'datareceb' : element.datareceb,
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
