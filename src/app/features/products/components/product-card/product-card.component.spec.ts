import { TestBed } from '@angular/core/testing';
import { Product } from '../../models/product.model';
import { PRODUCTS } from '../../testing/products.mock';
import { ProductCardComponent } from './product-card.component';

function setup(product: Product) {
  const fixture = TestBed.createComponent(ProductCardComponent);
  fixture.componentRef.setInput('product', product);
  fixture.detectChanges();
  const el: HTMLElement = fixture.nativeElement;
  return { fixture, el, buttons: el.querySelectorAll('button') };
}

describe('ProductCardComponent', () => {
  it('shows the discounted price', () => {
    const { el } = setup(PRODUCTS[0]);
    expect(el.textContent).toContain('$900.00');
  });

  it('emits the product when add button is clicked', () => {
    const { fixture, buttons } = setup(PRODUCTS[0]);
    let emitted: Product | undefined;
    fixture.componentInstance.addToCart.subscribe(p => (emitted = p));
    buttons[1].click();
    expect(emitted).toEqual(PRODUCTS[0]);
  });

  it('disables the add button when out of stock', () => {
    const { buttons } = setup(PRODUCTS[3]);
    expect(buttons[1].disabled).toBe(true);
  });

  it('enables the add button when in stock', () => {
    const { buttons } = setup(PRODUCTS[1]);
    expect(buttons[1].disabled).toBe(false);
  });
});
