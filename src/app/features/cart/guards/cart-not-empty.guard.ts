import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

export const cartNotEmptyGuard: CanActivateFn = () => {
  const cart = inject(CartService);
  const router = inject(Router);

  return cart.items().length > 0 ? router.createUrlTree(['/cart']) : true;
};
