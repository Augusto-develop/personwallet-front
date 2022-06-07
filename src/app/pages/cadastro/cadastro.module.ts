import {CadastroComponent} from './cadastro.component';
import {NgModule} from '@angular/core';
import {
   NbActionsModule,
   NbButtonModule,
   NbCardModule,
   NbIconModule,
   NbInputModule,
   NbSelectModule,
   NbTreeGridModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ThemeModule} from '../../@theme/theme.module';
import {CadastroRoutingModule, routedComponents} from './cadastro-routing.module';
import {CustomInputEditorComponent, ReceitaComponent} from './receita/receita.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG} from 'ng2-currency-mask';
import {FaturaComponent} from './fatura/fatura.component';
import {DespesaComponent} from './despesa/despesa.component';
import {CategoriaComponent} from './categoria/categoria.component';
import {PagamentoComponent} from './pagamento/pagamento.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MovimentoComponent} from './movimento/movimento.component';
import {DialogCartPgComponent} from './despesa/dialog-cart-pg/dialog-cart-pg.component';
import { DialogParcelaAllComponent } from './despesa/dialog-parcela-all/dialog-parcela-all.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
   align: 'right',
   allowNegative: false,
   decimal: ',',
   precision: 2,
   prefix: '',
   suffix: '',
   thousands: '.',
};

const materialModules = [
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatNativeDateModule,
   MatDatepickerModule,
   MatCheckboxModule,
   MatSlideToggleModule,
   MatRadioModule,
   MatButtonModule,
   MatButtonToggleModule,
];

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
      NbButtonModule,
      ...materialModules,
      ReactiveFormsModule,
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
      MovimentoComponent,
      DialogCartPgComponent,
      DialogParcelaAllComponent,
      FornecedorComponent,
   ],
   providers: [
      {provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig}],
})
export class CadastroModule {
}
