import { CadastroComponent } from './cadastro.component';
import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CadastroRoutingModule, routedComponents } from './cadastro-routing.module';
import { CustomInputEditorComponent, ReceitaComponent } from './receita/receita.component';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

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
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    CadastroRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    CurrencyMaskModule,
  ],
  declarations: [
    ...routedComponents,
    CadastroComponent,
    ReceitaComponent,
    CustomInputEditorComponent,
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
})
export class CadastroModule { }
