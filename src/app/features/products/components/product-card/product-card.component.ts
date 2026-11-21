import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Product } from '../../models/product.model';
import { DiscountPricePipe } from '../../pipes/discount-price.pipe';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, TitleCasePipe, DiscountPricePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly addToCart = output<Product>();
  readonly viewDetails = output<number>();
}
