import { TestBed } from '@angular/core/testing';
import { CartService } from '../../cart/services/cart.service';
import { PRODUCTS } from '../../products/testing/products.mock';
import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  it('creates an order with the cart total and then clears the cart', () => {
    const cart = TestBed.inject(CartService);
    cart.add(PRODUCTS[0]);
    cart.add(PRODUCTS[0]);

    const order = TestBed.inject(CheckoutService).placeOrder({
      fullName: 'Nika Beridze',
      email: 'nika@test.ge',
      address: 'Rustaveli 1',
      paymentMethod: 'card',
    });

    expect(order.total).toBe(1800);
    expect(order.items.length).toBe(1);
    expect(cart.items()).toEqual([]);
  });
});
