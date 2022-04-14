import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaComponent } from './pizza/pizza.component';
import { PastaComponent } from './pasta/pasta.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriiComponent } from './categorii/categorii.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TesteMaterialComponent } from './teste-material/teste-material.component';


@NgModule({
  declarations: [
    AppComponent,
    PizzaComponent,
    PastaComponent,
    FooterComponent,
    CategoriiComponent,
    ProductsComponent,
    TesteMaterialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
