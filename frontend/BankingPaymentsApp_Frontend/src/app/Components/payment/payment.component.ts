import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../Services/payment.service';
import { Payment } from '../../Models/Payment';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  payments: Payment[] = [];

  createPayment!: FormGroup;
  paymentCreated: boolean = false;

  accounts = [
    { accountNumber: "BPA20250921HGF5E3", name: "youbraj" },
    { accountNumber: "BPA20250921HGF172", name: "Rohan" },
    { accountNumber: "BPA20250921HGFK89", name: "Sujal" },
  ]

  constructor(private fb: FormBuilder, private paymentSvc: PaymentService, private auth: AuthService) { }

  ngOnInit(): void {
    this.createPayment = this.fb.group({
      payerAccountId: 0,
      payeeAccountNumber: "",
      amount: 0
    })

    const user = this.auth.getLoggedInUser();
    console.log(user);
    if (user) {
      this.createPayment.patchValue({ payerAccountId: user.userId });
    }
  }

  makePayment() {
    console.log(this.createPayment.value)
    // this.paymentSvc.createPayment(this.createPayment.value).subscribe((data) => {
    //   console.log(data);
    //   this.paymentCreated = true;
    // },
    //   (error) => {
    //     console.log(error);
    //   }
    // )

  }
}
