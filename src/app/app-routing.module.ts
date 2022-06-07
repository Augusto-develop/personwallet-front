import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {
   NbAuthComponent,
   NbLoginComponent,
   NbLogoutComponent,
   NbRegisterComponent,
   NbRequestPasswordComponent,
   NbResetPasswordComponent,
} from '@nebular/auth';
import {NgxAuthModule} from './auth/auth.module';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from "./auth-guard-service";


export const routes: Routes = [
   {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
   /*{path: '**', redirectTo: 'auth/login', pathMatch: 'full'},
   {path: '/', redirectTo: 'auth/login', pathMatch: 'full'},*/
   {
      path: 'pages',
      canActivate: [AuthGuard],
      loadChildren: () => import('./pages/pages.module')
         .then(m => m.PagesModule),
   },
   {
      path: 'auth',
      /*component: AuthComponent,*/
      loadChildren: () => import('./auth/auth.module')
         .then(m => m.NgxAuthModule),
      /*children: [
        {
          path: '',
          component: NbLoginComponent,
        },
        {
          path: 'login',
          component: NgxAuthModule,
        },
        {
          path: 'register',
          component: NbRegisterComponent,
        },
        {
          path: 'logout',
          component: NbLogoutComponent,
        },
        {
          path: 'request-password',
          component: NbRequestPasswordComponent,
        },
        {
          path: 'reset-password',
          component: NbResetPasswordComponent,
        },
      ],*/
   },
];

const config: ExtraOptions = {
   useHash: false,
};

@NgModule({
   imports: [RouterModule.forRoot(routes, config)],
   exports: [RouterModule],
})
export class AppRoutingModule {
}
