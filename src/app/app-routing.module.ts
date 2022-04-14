import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriiComponent } from './categorii/categorii.component';
import { PastaComponent } from './pasta/pasta.component';
import { PizzaComponent } from './pizza/pizza.component';
import { ProductsComponent } from './products/products.component';
import { TesteMaterialComponent } from './teste-material/teste-material.component';

const routes: Routes = [
  {
    path: 'pizza',
    component: PizzaComponent
  },
  {
    path: 'pasta',
    component: PastaComponent
  },
  {
    path: 'categorii',
    component: CategoriiComponent
  },
  {
    path: 'paste',
    component: PastaComponent 
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'teste',
    component: TesteMaterialComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
