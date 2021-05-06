import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardfaturasComponent } from './cardfaturas/cardfaturas.component';
import { CardsaldogeralComponent } from './cardsaldogeral/cardsaldogeral.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    CardfaturasComponent,
    CardsaldogeralComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
})
export class AppModule { }
