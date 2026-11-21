import { Routes } from '@angular/router';
import { ProductDetailsContainer } from './containers/product-details/product-details.container';
import { ProductListContainer } from './containers/product-list/product-list.container';

export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: ProductListContainer },
  { path: ':productId', component: ProductDetailsContainer },
];
