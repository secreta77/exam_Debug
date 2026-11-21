import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CategoryFilter, Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './product-list.container.html',
  styleUrl: './product-list.container.css',
})
export class ProductListContainer {
  private readonly productsService = inject(ProductsService);
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly categories: CategoryFilter[] = ['all', 'phones', 'laptops', 'accessories'];
  readonly search = signal('');
  readonly products = toSignal(this.productsService.getAll(), { initialValue: [] as Product[] });
  readonly category = toSignal(
    this.route.queryParamMap.pipe(map(q => (q.get('category') ?? 'all') as CategoryFilter)),
    { initialValue: 'all' as CategoryFilter },
  );

  readonly visibleProducts = computed(() =>
    this.productsService.filter(this.products(), this.search(), this.category()),
  );

  addToCart(product: Product): void {
    this.cart.add(product);
  }

  openDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
