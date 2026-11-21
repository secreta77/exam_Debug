import { DiscountPricePipe } from './discount-price.pipe';

describe('DiscountPricePipe', () => {
  const pipe = new DiscountPricePipe();

  it('applies a percentage discount', () => expect(pipe.transform(200, 25)).toBe(150));
  it('returns the same price for 0%', () => expect(pipe.transform(100, 0)).toBe(100));
  it('rounds to 2 decimals', () => expect(pipe.transform(19.99, 10)).toBe(17.99));
});
