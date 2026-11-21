import { Pipe, PipeTransform } from '@angular/core';

export function calcDiscountedPrice(price: number, discountPercent: number): number {
  return Math.round(price * discountPercent) / 100;
}

@Pipe({ name: 'discountPrice' })
export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discountPercent: number): number {
    return calcDiscountedPrice(price, discountPercent);
  }
}
