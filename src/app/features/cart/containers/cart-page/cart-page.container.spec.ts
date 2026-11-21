import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PRODUCTS } from '../../../products/testing/products.mock';
import { CartService } from '../../services/cart.service';
import { CartPageContainer } from './cart-page.container';

describe('CartPageContainer', () => {
  it('renders items and updates quantity through the cart service', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const cart = TestBed.inject(CartService);
    cart.add(PRODUCTS[0]);

    const fixture = TestBed.createComponent(CartPageContainer);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelectorAll('app-cart-item').length).toBe(1);
    (el.querySelectorAll('app-cart-item button')[1] as HTMLButtonElement).click(); // "+"
    fixture.detectChanges();
    expect(cart.items()[0].quantity).toBe(2);
    expect(el.textContent).toContain('$1,800.00');
  });
});
