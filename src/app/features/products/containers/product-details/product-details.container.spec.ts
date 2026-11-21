import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { PRODUCTS } from '../../testing/products.mock';
import { PRODUCTS_ROUTES } from '../../products.routes';
import { ProductDetailsContainer } from './product-details.container';

describe('ProductDetailsContainer', () => {
  it('shows the product selected by the route parameter', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'products', children: PRODUCTS_ROUTES }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/products/3', ProductDetailsContainer);
    TestBed.inject(HttpTestingController).expectOne('products.json').flush(PRODUCTS);
    harness.detectChanges();
    expect(harness.routeNativeElement?.textContent).toContain('MacBook Air');
  });
});
