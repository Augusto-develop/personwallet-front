import { CarteiraComponent } from './carteira/carteira.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro.component';
import { ReceitaComponent } from './receita/receita.component';
import { FaturaComponent } from './fatura/fatura.component';
import { DespesaComponent } from './despesa/despesa.component';
import { CategoriaComponent } from './categoria/categoria.component';

const routes2: Routes = [{
  path: '',
  component: CadastroComponent,
  children: [
    {
      path: 'carteira',
      component: CarteiraComponent,
    },
    {
      path: 'categoria',
      component: CategoriaComponent,
    },
    {
      path: 'despesa',
      component: DespesaComponent,
    },
    {
      path: 'fatura',
      component: FaturaComponent,
    },
    {
      path: 'receita',
      component: ReceitaComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes2)],
  exports: [RouterModule],
})
export class CadastroRoutingModule { }

export const routedComponents = [
  CarteiraComponent,
  ReceitaComponent,
];
