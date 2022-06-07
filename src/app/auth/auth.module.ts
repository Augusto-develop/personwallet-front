import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {NgxAuthRoutingModule} from './auth-routing.module';
import {NbAuthJWTToken, NbAuthModule, NbOAuth2AuthStrategy, NbPasswordAuthStrategy} from '@nebular/auth';
import {
   NbAlertModule,
   NbButtonModule,
   NbCheckboxModule, NbIconModule,
   NbInputModule,
} from '@nebular/theme';
import {LoginComponent} from "./login/login.component";
import {HttpClientXsrfModule} from "@angular/common/http";

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      NbAlertModule,
      NbInputModule,
      NbButtonModule,
      NbCheckboxModule,
      NgxAuthRoutingModule,
      NbAuthModule.forRoot({
         strategies: [
            NbPasswordAuthStrategy.setup({
               name: 'email',
               baseEndpoint: '//personwallet/api/v1',
               login: {
                  // ...
                  endpoint: '/login',
                  redirect: {
                     success: '/pages/controle',
                     failure: null,
                  },
               },
               register: {
                  // ...
                  endpoint: '/register',
               },
            }),
         ],
         forms: {},
      }),
      NbIconModule,
   ],
   declarations: [
      LoginComponent,
   ],
})

export class NgxAuthModule {
}
