import { AsyncPipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';
import { Product } from '../../models/product.model';
import { DiscountPricePipe } from '../../pipes/discount-price.pipe';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, TitleCasePipe, DiscountPricePipe, RouterLink],
  templateUrl: './product-details.container.html',
  styleUrl: './product-details.container.css',
})
export class ProductDetailsContainer {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cart = inject(CartService);

  readonly product$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    map(id => this.productsService.getById(id)),
  );

  addToCart(product: Product): void {
    this.cart.add(product);
  }
}
