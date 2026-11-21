import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { PRODUCTS } from '../../../products/testing/products.mock';
import { CheckoutPageContainer } from './checkout-page.container';

describe('CheckoutPageContainer', () => {
  const valid = {
    fullName: 'Nika Beridze',
    email: 'nika@test.ge',
    address: 'Rustaveli 1',
    paymentMethod: 'card' as const,
    agree: true,
  };
  let cart: CartService;
  let cmp: CheckoutPageContainer;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    cart = TestBed.inject(CartService);
    cart.add(PRODUCTS[0]);
    cmp = TestBed.createComponent(CheckoutPageContainer).componentInstance;
  });

  it('renders the form without errors', () => {
    const fixture = TestBed.createComponent(CheckoutPageContainer);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form')).not.toBeNull();
  });

  it('is valid with correct data', () => {
    cmp.form.setValue(valid);
    expect(cmp.form.valid).toBe(true);
  });

  it('requires accepting the terms', () => {
    cmp.form.setValue({ ...valid, agree: false });
    expect(cmp.form.invalid).toBe(true);
  });

  it('rejects an invalid email', () => {
    cmp.form.setValue({ ...valid, email: 'not-an-email' });
    expect(cmp.form.invalid).toBe(true);
  });

  it('places the order and clears the cart on submit', () => {
    cmp.form.setValue(valid);
    cmp.submit();
    expect(cmp.order()?.total).toBe(900);
    expect(cart.items()).toEqual([]);
  });
});
