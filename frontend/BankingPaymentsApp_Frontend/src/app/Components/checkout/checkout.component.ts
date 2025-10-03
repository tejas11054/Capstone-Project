import { Component, ElementRef, ViewChild } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripePaymentElement } from '@stripe/stripe-js';
import { StripeService } from '../../Services/stripe.service';
import { AuthService } from '../../Services/auth.service';
import { ClientRegisterService } from '../../Services/client.service';
import { ClientUser } from '../../Models/ClientUser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  @ViewChild('paymentElementContainer') paymentElementContainer!: ElementRef;
  client!: ClientUser;
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  paymentElement!: StripePaymentElement;
  clientSecret = '';
  amount!: number;
  accountId!: number;
  step = 1;
  userId!: number;

  private paymentElementMounted = false;

  readonly publishableKey = 'pk_test_51S8mOsDOPLdDJTqxlGeJpMgGGYyEwDCdZxWsUUPSwytFajTd994usIhRsWkPlPpQuSEHH43jIFiQ98qlbqxP14IC00hLeQUB1m';

  constructor(private stripeSvc: StripeService, private notify: NotificationService ,private auth: AuthService, private clientSvc: ClientRegisterService, private router: Router) { }

  async ngOnInit() {
    this.stripe = await loadStripe(this.publishableKey);
    this.userId = Number(this.auth.getUserId());
    this.fetchClient();
  }

  fetchClient() {
    this.clientSvc.getClientById(this.userId).subscribe((data) => {
      console.log(data);
      this.client = data;
    },
      (error) => {
        console.log(error);
      })
  }

  ngAfterViewChecked() {
    // Mount Payment Element only once after step = 2
    if (this.step === 2 && this.paymentElementContainer && !this.paymentElementMounted) {
      if (!this.clientSecret || !this.stripe) return;

      this.elements = this.stripe.elements({ clientSecret: this.clientSecret });
      this.paymentElement = this.elements.create('payment');
      this.paymentElement.mount(this.paymentElementContainer.nativeElement);
      this.paymentElementMounted = true;
    }
  }

  startPayment() {
    if (!this.amount) {
      this.notify.error('Enter amount');
      return;
    }

    let accountId = Number(this.client.accountId);

    this.stripeSvc.createPaymentIntent(this.amount * 100, accountId)
      .subscribe(resp => {
        if (!resp.clientSecret) {
          this.notify.error('Failed to create payment intent');
          return;
        }

        this.clientSecret = resp.clientSecret;
        this.step = 2; // triggers AfterViewChecked to mount element
      });
  }

  async confirmPayment() {
    if (!this.stripe || !this.elements) return;

    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
      },
      redirect: 'if_required'
    });



    if (error) {
      this.notify.error('Payment failed: ' + error.message);
    } else {
      let accountId = Number(this.client.accountId);
      this.stripeSvc.finalizePayment(accountId, this.amount).subscribe((data) => {
        console.log(data);
        this.notify.success("Self Transfer is completed");
        this.router.navigate(["/transactions"])
      },
        (error) => {
          console.log(error);
        })
    }
  }
}
