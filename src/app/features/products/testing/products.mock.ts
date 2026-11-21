import { Product } from '../models/product.model';

export const PRODUCTS: Product[] = [
  { id: 1, title: 'iPhone 15', price: 1000, discountPercent: 10, category: 'phones', inStock: true },
  { id: 2, title: 'Galaxy S24', price: 800, discountPercent: 0, category: 'phones', inStock: true },
  { id: 3, title: 'MacBook Air', price: 1200, discountPercent: 25, category: 'laptops', inStock: true },
  { id: 4, title: 'USB-C Cable', price: 20, discountPercent: 0, category: 'accessories', inStock: false },
];
