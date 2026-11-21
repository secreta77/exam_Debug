import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../testing/products.mock';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(ProductsService);
    http = TestBed.inject(HttpTestingController);
  });

  it('loads products from products.json', () => {
    let result: Product[] = [];
    service.getAll().subscribe(r => (result = r));
    const req = http.expectOne('products.json');
    expect(req.request.method).toBe('GET');
    req.flush(PRODUCTS);
    expect(result).toEqual(PRODUCTS);
  });

  it('finds a product by id', () => {
    let result: Product | undefined;
    service.getById(3).subscribe(r => (result = r));
    http.expectOne('products.json').flush(PRODUCTS);
    expect(result?.title).toBe('MacBook Air');
  });

  it('filters by category', () => {
    expect(service.filter(PRODUCTS, '', 'phones').map(p => p.id)).toEqual([1, 2]);
  });

  it('returns everything for category "all"', () => {
    expect(service.filter(PRODUCTS, '', 'all').length).toBe(4);
  });

  it('search is case-insensitive', () => {
    expect(service.filter(PRODUCTS, 'IPHONE', 'all').map(p => p.id)).toEqual([1]);
  });
});
