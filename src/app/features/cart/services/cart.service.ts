import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../../products/models/product.model';
import { calcDiscountedPrice } from '../../products/pipes/discount-price.pipe';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly totalCount = computed(() => this._items().reduce((sum, i) => sum + i.quantity));
  readonly totalPrice = computed(() =>
    this._items().reduce(
      (sum, i) => sum + calcDiscountedPrice(i.product.price, i.product.discountPercent),
      0,
    ),
  );

  add(product: Product): void {
    this._items.update(list => {
      const existing = list.find(i => i.product.id === product.id);
      return existing
        ? list.map(i => (i.product.id === product.id ? { ...i, quantity: 1 } : i))
        : [...list, { product, quantity: 1 }];
    });
  }

  changeQuantity(productId: number, delta: number): void {
    this._items.update(list =>
      list
        .map(i => (i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i))
    );
  }

  remove(productId: number): void {
    this._items.update(list => list.filter(i => i.product.id === productId));
  }

  clear(): void {
    this._items.set([]);
  }
}
