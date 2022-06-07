import { ListfaturasComponent } from './listfaturas/listfaturas.component';
import { SaldogeralComponent } from './saldogeral/saldogeral.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControleComponent } from './controle.component';
import { NbAccordionModule, NbActionsModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { SaldocartaoComponent } from './saldocartao/saldocartao.component';
import {PieChartModule} from '@swimlane/ngx-charts';
import {MatRippleModule} from "@angular/material/core";

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
        PieChartModule,
        MatRippleModule,
    ],
  declarations: [
    ControleComponent,
    SaldogeralComponent,
    ListfaturasComponent,
    SaldocartaoComponent,
  ],
})
export class ControleModule { }
