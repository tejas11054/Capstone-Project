import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../Services/payment.service';
import { Payment } from '../../Models/Payment';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ClientRegisterService } from '../../Services/client-register.service';
import { Beneficiary } from '../../Models/Beneficiary';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  payments: Payment[] = [];

  createPayment!: FormGroup;
  paymentCreated: boolean = false;

  beneficiaries!: Beneficiary[];

  constructor(private fb: FormBuilder, private paymentSvc: PaymentService, private auth: AuthService, private clientSvc: ClientRegisterService) { }

  ngOnInit(): void {

    this.createPayment = this.fb.group({
      payerAccountId: 0,
      payeeAccountNumber: "",
      amount: 0
    })
    const user = this.auth.getLoggedInUser();
    console.log(user);

    this.beneficiaries = [];
    if (user) {
      this.createPayment.patchValue({ payerAccountId: user.userId });

      this.clientSvc.getClientUserById(user?.userId).subscribe((data) => {
        if (data && data.beneficiaries)
          this.beneficiaries = data.beneficiaries;
        console.log(data)
      },
        (error) => {
          console.log(error);
        })
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
