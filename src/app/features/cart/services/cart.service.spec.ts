import { TestBed } from '@angular/core/testing';
import { PRODUCTS } from '../../products/testing/products.mock';
import { CartService } from './cart.service';

describe('CartService', () => {
  let cart: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    cart = TestBed.inject(CartService);
  });

  it('increments quantity when the same product is added twice', () => {
    cart.add(PRODUCTS[0]);
    cart.add(PRODUCTS[0]);
    expect(cart.items().length).toBe(1);
    expect(cart.items()[0].quantity).toBe(2);
  });

  it('totalCount sums quantities', () => {
    cart.add(PRODUCTS[0]);
    cart.add(PRODUCTS[0]);
    cart.add(PRODUCTS[1]);
    expect(cart.totalCount()).toBe(3);
  });

  it('totalPrice uses discounted prices and quantities', () => {
    cart.add(PRODUCTS[0]);
    cart.add(PRODUCTS[0]);
    cart.add(PRODUCTS[2]);
    expect(cart.totalPrice()).toBe(2700);
  });

  it('changeQuantity changes and removes at zero', () => {
    cart.add(PRODUCTS[0]);
    cart.changeQuantity(1, 1);
    expect(cart.items()[0].quantity).toBe(2);
    cart.changeQuantity(1, -2);
    expect(cart.items().length).toBe(0);
  });

  it('remove deletes only the given product', () => {
    cart.add(PRODUCTS[0]);
    cart.add(PRODUCTS[1]);
    cart.remove(1);
    expect(cart.items().map(i => i.product.id)).toEqual([2]);
  });

  it('clear empties the cart', () => {
    cart.add(PRODUCTS[0]);
    cart.clear();
    expect(cart.items()).toEqual([]);
  });
});
