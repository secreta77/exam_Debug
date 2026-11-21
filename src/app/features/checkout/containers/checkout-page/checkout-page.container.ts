import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { Order, PaymentMethod } from '../../models/order.model';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout-page',
  imports: [DatePipe, RouterLink, OrderSummaryComponent],
  templateUrl: './checkout-page.container.html',
  styleUrl: './checkout-page.container.css',
})
export class CheckoutPageContainer {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly checkout = inject(CheckoutService);
  readonly cart = inject(CartService);

  readonly order = signal<Order | null>(null);

  readonly form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', Validators.required],
    address: ['', Validators.required],
    paymentMethod: ['card' as PaymentMethod],
    agree: [false, Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { agree, ...customer } = this.form.getRawValue();
    this.order.set(this.checkout.placeOrder(customer));
  }
}
