import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NbAuthComponent, NbLogoutComponent} from "@nebular/auth";
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
   {
      path: '',
      component: NbAuthComponent,
      children: [
         {
            path: 'login',
            component: LoginComponent,
         },
         {
            path: 'logout',
            component: NbLogoutComponent,
         },
      ],
   },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
