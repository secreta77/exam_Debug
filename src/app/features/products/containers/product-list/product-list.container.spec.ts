import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { PRODUCTS } from '../../testing/products.mock';
import { ProductListContainer } from './product-list.container';

describe('ProductListContainer', () => {
  function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    const fixture = TestBed.createComponent(ProductListContainer);
    fixture.detectChanges();
    TestBed.inject(HttpTestingController).expectOne('products.json').flush(PRODUCTS);
    fixture.detectChanges();
    return fixture;
  }

  it('renders a card for every product', () => {
    const fixture = setup();
    expect(fixture.nativeElement.querySelectorAll('app-product-card').length).toBe(4);
  });

  it('adds the product to the cart when a card emits addToCart', () => {
    const fixture = setup();
    const addButton = fixture.nativeElement.querySelectorAll('app-product-card')[0].querySelectorAll('button')[1];
    addButton.click();
    expect(TestBed.inject(CartService).items().length).toBe(1);
  });

  it('filters the visible products by the search signal', () => {
    const fixture = setup();
    fixture.componentInstance.search.set('galaxy');
    expect(fixture.componentInstance.visibleProducts().map(p => p.id)).toEqual([2]);
  });
});
