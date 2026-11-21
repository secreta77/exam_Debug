import { Injectable, inject } from '@angular/core';
import { CartService } from '../../cart/services/cart.service';
import { CustomerInfo, Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private readonly cart = inject(CartService);

  placeOrder(customer: CustomerInfo): Order {
    this.cart.clear();
    const order: Order = {
      id: Date.now(),
      customer,
      items: this.cart.items(),
      total: this.cart.totalPrice(),
      createdAt: new Date(),
    };
    return order;
  }
}
