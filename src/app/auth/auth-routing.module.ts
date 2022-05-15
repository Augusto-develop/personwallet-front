import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {AuthComponent } from './auth.component';
import {LoginComponent} from "./login/login.component";
import {NotFoundComponent} from "../pages/miscellaneous/not-found/not-found.component";

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
