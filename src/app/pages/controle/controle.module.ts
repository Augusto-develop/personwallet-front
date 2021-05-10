import { ListfaturasComponent } from './listfaturas/listfaturas.component';
import { SaldogeralComponent } from './saldogeral/saldogeral.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControleComponent } from './controle.component';
import { NbAccordionModule, NbCardModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbAccordionModule,
  ],
  declarations: [
    ControleComponent,
    SaldogeralComponent,
    ListfaturasComponent,
  ],
})
export class ControleModule { }
