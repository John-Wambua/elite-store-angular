import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductListComponent} from "./products/product-list/product-list.component";
import {ProductDetailComponent} from "./products/product-detail/product-detail.component";
import {AuthComponent} from "./auth/auth.component";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {path: '', redirectTo:  '/products', pathMatch: 'full'},
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
