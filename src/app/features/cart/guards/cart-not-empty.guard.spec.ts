import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { PRODUCTS } from '../../products/testing/products.mock';
import { CartService } from '../services/cart.service';
import { cartNotEmptyGuard } from './cart-not-empty.guard';

describe('cartNotEmptyGuard', () => {
  const run = () =>
    TestBed.runInInjectionContext(() =>
      cartNotEmptyGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );

  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('redirects to /cart when the cart is empty', () => {
    expect(run()).toBeInstanceOf(UrlTree);
  });

  it('allows navigation when the cart has items', () => {
    TestBed.inject(CartService).add(PRODUCTS[0]);
    expect(run()).toBe(true);
  });
});
