export type Category = 'phones' | 'laptops' | 'accessories';
export type CategoryFilter = Category | 'all';

export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercent: number;
  category: Category;
  inStock: boolean;
}
