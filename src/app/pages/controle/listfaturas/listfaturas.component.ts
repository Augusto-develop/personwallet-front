import { Despesa, DespesaService } from './../../../@core/database/despesa.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Fatura, FaturaFechada, FaturaService } from '../../../@core/database/fatura.service';
import { Conta } from '../conta';
import { FATURAS } from '../data-faturas';
import { UtilService } from '../../../@core/utils/util.service';

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
export class ListfaturasComponent implements OnChanges, OnInit {

   public faturas = FATURAS;
   public contas: Despesa[] | undefined;
   public selectedItem: FaturaFechada | undefined;
   public animal!: string;
   public name!: string;

   @Input() public mesfat: string | undefined;
   @Input() public anofat: string | undefined;
   @Input() public onsearch: boolean;
   ResultGetExtrato: FaturaFechada[];

   constructor(private faturaService: FaturaService, private despesaService: DespesaService) {

   }

  public onSelect(faturaFechada: FaturaFechada): void {
    this.despesaService.getDespesas(faturaFechada.id, faturaFechada.mesfat, faturaFechada.anofat)
      .subscribe((resultado: Despesa[]) => {
      this.contas = resultado;
    });
    this.selectedItem = faturaFechada;
  }

  onPesquisaFaturas() {
    this.faturaService.getExtrato(this.mesfat, this.anofat).subscribe((resultado: FaturaFechada[]) => {
      const listfaturas = [];
      Array.from(resultado).forEach(element => {
         const valorpago = UtilService.converteMoedaFloat(element.pago);
         const valorfatura = UtilService.converteMoedaFloat(element.valor);

         if (valorfatura === 0) {
            element.status = 'PG';
         } else
         if (valorpago === 0) {
            element.status = 'AB';
         } else
         if (valorpago < valorfatura) {
            element.status = 'PC';
         } else {
            element.status = 'PG';
         }

         listfaturas.push(element);
       });
       this.ResultGetExtrato = listfaturas;
    });
  }

   ngOnInit() {
      this.onPesquisaFaturas();
   }

   ngOnChanges(changes: SimpleChanges) {
      if (changes.onsearch.currentValue) {
         this.onPesquisaFaturas();
      }
   }
}
