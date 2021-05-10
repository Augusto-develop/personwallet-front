import { CarteiraComponent } from './carteira/carteira.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro.component';

const routes2: Routes = [{
  path: '',
  component: CadastroComponent,
  children: [
    {
      path: 'carteira',
      component: CarteiraComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes2)],
  exports: [RouterModule],
})
export class CadastroRoutingModule { }

export const routedComponents = [
  CarteiraComponent,
];
