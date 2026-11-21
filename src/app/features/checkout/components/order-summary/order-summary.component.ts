import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { CartItem } from '../../../cart/models/cart-item.model';

@Component({
  selector: 'app-order-summary',
  imports: [CurrencyPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  readonly items = input.required<CartItem[]>();
  readonly total = input.required<number>();
}
