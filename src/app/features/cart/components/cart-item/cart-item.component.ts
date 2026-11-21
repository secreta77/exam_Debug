import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { DiscountPricePipe } from '../../../products/pipes/discount-price.pipe';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe, DiscountPricePipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  readonly item = input.required<CartItem>();
  readonly quantityChange = output<number>();
  readonly removed = output<void>();
}
