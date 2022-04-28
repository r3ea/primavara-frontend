import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaComponent } from './pizza/pizza.component';
import { PastaComponent } from './pasta/pasta.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriiComponent } from './categorii/categorii.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TesteMaterialComponent } from './teste-material/teste-material.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductAddDialogComponent } from './product-add-dialog/product-add-dialog.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { ProductEditDialogComponent } from './product-edit-dialog/product-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaComponent,
    PastaComponent,
    FooterComponent,
    CategoriiComponent,
    ProductsComponent,
    TesteMaterialComponent,
    ProductAddDialogComponent,
    DialogConfirmComponent,
    ProductEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
