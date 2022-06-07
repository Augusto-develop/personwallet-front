/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {
   NbChatModule,
   NbDatepickerModule,
   NbDialogModule,
   NbMenuModule,
   NbSidebarModule,
   NbToastrModule,
   NbWindowModule,
} from '@nebular/theme';
import {AuthTokenInterceptor} from "./auth-token.interceptor";
import {AuthGuard} from "./auth-guard-service";

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      HttpClientXsrfModule.withOptions({
         cookieName: 'XSRF-TOKEN',
         headerName: 'X-CSRF-TOKEN',
      }),
      AppRoutingModule,
      NbSidebarModule.forRoot(),
      NbMenuModule.forRoot(),
      NbDatepickerModule.forRoot(),
      NbDialogModule.forRoot(),
      NbWindowModule.forRoot(),
      NbToastrModule.forRoot(),
      NbChatModule.forRoot({
         messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
      }),
      CoreModule.forRoot(),
      ThemeModule.forRoot(),
   ],
   bootstrap: [AppComponent],
   providers: [
      {provide: LOCALE_ID, useValue: 'pt-BR'},
      { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
      AuthGuard,
      {provide: LocationStrategy, useClass: HashLocationStrategy},
   ],
})
export class AppModule {
}
