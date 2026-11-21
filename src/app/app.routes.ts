import { Routes } from '@angular/router';
import { CART_ROUTES } from './features/cart/cart.routes';
import { cartNotEmptyGuard } from './features/cart/guards/cart-not-empty.guard';
import { CHECKOUT_ROUTES } from './features/checkout/checkout.routes';
import { PRODUCTS_ROUTES } from './features/products/products.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'products' },
  { path: 'products', children: PRODUCTS_ROUTES },
  { path: 'cart', children: CART_ROUTES },
  { path: 'checkout', children: CHECKOUT_ROUTES, canActivate: [cartNotEmptyGuard] },
  { path: '**', redirectTo: 'products' },
];
