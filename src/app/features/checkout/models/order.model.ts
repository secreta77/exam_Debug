import { CartItem } from '../../cart/models/cart-item.model';

export type PaymentMethod = 'card' | 'cash';

export interface CustomerInfo {
  fullName: string;
  email: string;
  address: string;
  paymentMethod: PaymentMethod;
}

export interface Order {
  id: number;
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  createdAt: Date;
}
