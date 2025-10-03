import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from '../Models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  apiUrl: string = environment.backendURL + "/Stripe"
  constructor(private http: HttpClient) { }

  createPaymentIntent(amount: number, accountId: number): Observable<any> {
    return this.http.post<{ clientSecret: string }>(this.apiUrl + '/create-intent', {
      amount,
      accountId
    });
  }

  finalizePayment(accountId: number, amount: number):Observable<Transaction> {
    return this.http.post<Transaction>(
      this.apiUrl + '/finalize',
      { accountId, amount }
    );
  }
}
