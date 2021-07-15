import { CadastroComponent } from './cadastro.component';
import { NgModule } from '@angular/core';
import { NbActionsModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CadastroRoutingModule, routedComponents } from './cadastro-routing.module';
import { CustomInputEditorComponent, ReceitaComponent } from './receita/receita.component';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { FaturaComponent } from './fatura/fatura.component';
import { DespesaComponent } from './despesa/despesa.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: '',
  suffix: '',
  thousands: '.',
};

@NgModule({
  imports: [
    NbCardModule,
    DragDropModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    CadastroRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    CurrencyMaskModule,
    NbSelectModule,
    NbActionsModule,
  ],
  declarations: [
    ...routedComponents,
    CadastroComponent,
    CategoriaComponent,
    DespesaComponent,
    FaturaComponent,
    ReceitaComponent,
    ReceitaComponent,
    CustomInputEditorComponent,
    PagamentoComponent,
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
})
export class CadastroModule { }
