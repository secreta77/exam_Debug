import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [CartItemComponent, CurrencyPipe, RouterLink],
  templateUrl: './cart-page.container.html',
  styleUrl: './cart-page.container.css',
})
export class CartPageContainer {
  readonly cart = inject(CartService);
}
