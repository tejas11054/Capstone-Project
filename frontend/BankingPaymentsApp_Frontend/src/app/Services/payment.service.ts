import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { Payment } from '../Models/Payment';
import { PaymentDTO } from '../DTO/PaymentDTO';
import { RejectDTO } from '../DTO/RejectDTO';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentURL:string = environment.backendURL + "/Payment";
  constructor(private http:HttpClient) { }

  getAllPayments():Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(this.paymentURL);
  }

  createPayment(payment:PaymentDTO):Observable<Payment>{
    return this.http.post<Payment>(this.paymentURL,payment)
  }

  approvePayment(payment:Payment):Observable<Payment>{
    console.log(this.paymentURL + `approve/${payment.paymentId}`);
    return this.http.put<Payment>(this.paymentURL + `/approve/${payment.paymentId}`,payment);
  }

  rejectPayment(rejectResponse:RejectDTO):Observable<void>{
    return this.http.put<void>(this.paymentURL+`/reject/${rejectResponse.id}`,rejectResponse);
  }
}
