import { Despesa, DespesaService } from './../../../@core/database/despesa.service';
import { Component, OnInit } from '@angular/core';
import { Fatura, FaturaFechada, FaturaService } from '../../../@core/database/fatura.service';
import { Conta } from '../conta';
import { FATURAS } from '../data-faturas';

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
   public contas: Despesa[] | undefined;
   public selectedItem: FaturaFechada | undefined;
   public animal!: string;
   public name!: string;
    ResultGetExtrato: FaturaFechada[];
    mesfat = '06';
    anofat = '2021';

   constructor(private faturaService: FaturaService, private despesaService: DespesaService) {
    this.onPesquisaFaturas();
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
      this.ResultGetExtrato = resultado;
      /*const listExtrato = [];
      Array.from(this.ResultGetExtrato).forEach(element => {
        listExtrato.push(element);
      });*/
    });
  }
}
