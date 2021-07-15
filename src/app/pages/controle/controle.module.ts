import { ListfaturasComponent } from './listfaturas/listfaturas.component';
import { SaldogeralComponent } from './saldogeral/saldogeral.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControleComponent } from './controle.component';
import { NbAccordionModule, NbActionsModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbAccordionModule,
    NbSelectModule,
    NbActionsModule,
    NbIconModule,
    NbInputModule,
    NbActionsModule,
    FormsModule,
  ],
  declarations: [
    ControleComponent,
    SaldogeralComponent,
    ListfaturasComponent,
  ],
})
export class ControleModule { }
