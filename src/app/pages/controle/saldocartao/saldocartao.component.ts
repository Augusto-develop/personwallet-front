import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {UtilService} from '../../../@core/utils/util.service';
import {Fatura, FaturaCartao, FaturaFechada} from '../../../@core/database/fatura.service';

@Component({
   selector: 'ngx-saldocartao',
   templateUrl: './saldocartao.component.html',
   styleUrls: ['./saldocartao.component.scss', '../../../../assets/icons/css/pwicons/style.css'],
})
export class SaldocartaoComponent implements OnDestroy, OnInit {

   @Input() public fatura: FaturaCartao;

   single = [];
   colorScheme: any;
   themeSubscription: any;
   labeltotal: string;

   descricaoCartao: string;

   isMidway: boolean;
   isCaixa: boolean;
   isItau: boolean;
   isSantander: boolean;
   isNubank: boolean;
   isC6bank: boolean;
   isRchlo: boolean;
   isMastercard: boolean;
   isVisa: boolean;
   isPipeSecond: boolean;

   constructor(private theme: NbThemeService) {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
         const colors: any = config.variables;
         this.colorScheme = {
            domain: [
               colors.successLight,
               colors.dangerLight,
               colors.warningLight,
               colors.primaryLight,
               colors.infoLight,
            ],
         };
         this.labeltotal = 'Limite Total';

         this.isMidway = false;
         this.isCaixa = false;
         this.isItau = false;
         this.isSantander = false;
         this.isC6bank = false;
         this.isNubank = false;
         this.isRchlo = false;
         this.isMastercard = false;
         this.isVisa = false;
         this.isPipeSecond = false;
      });
   }

   ngOnInit() {

      let statusFaturaDescr = '';
      switch (this.fatura.fatstatus) {
         case 'CLOSED':
            statusFaturaDescr = 'Fatura Fechada';
            break;
         case 'CURRENT':
            statusFaturaDescr = 'Fatura Atual';
            break;
      }

      this.single = [
         {
            name: 'Limite Disponível',
            value: UtilService.converteMoedaFloat(this.fatura.limiteavailable),
         },
         {
            name: statusFaturaDescr,
            value: UtilService.converteMoedaFloat(this.fatura.fatcurrent),
         },
         {
            name: 'Próximas  Faturas',
            value: UtilService.converteMoedaFloat(this.fatura.fatnext),
         },
      ];

      this.descricaoCartao = this.fatura.descricao;
      switch (this.fatura.emissor) {
         case 'MIDWAY':
            this.isMidway = true;
            break;
         case 'CAIXA':
            this.isCaixa = true;
            break;
         case 'ITAU':
            this.isItau = true;
            break;
         case 'SANTANDER':
            this.isSantander = true;
            break;
         case 'C6BANK':
            this.isC6bank = true;
            break;
         case 'NUBANK':
            this.isNubank = true;
            break;
      }

      switch (this.fatura.typecard) {
         case 'RCHLO':
            this.isRchlo = true;
            this.isPipeSecond = true;
            break;
      }

      switch (this.fatura.bandeira) {
         case 'MASTERCARD':
            this.isMastercard = true;
            break;
         case 'VISA':
            this.isVisa = true;
            break;
      }
   }

   ngOnDestroy(): void {
      this.themeSubscription.unsubscribe();
   }

   formatvalue(valor) {
      return UtilService.formatmoeda(valor);
   }
}
