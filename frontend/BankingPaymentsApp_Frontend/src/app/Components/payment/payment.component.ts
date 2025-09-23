import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../Services/payment.service';
import { Payment } from '../../Models/Payment';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ClientRegisterService } from '../../Services/client-register.service';
import { Beneficiary } from '../../Models/Beneficiary';
import { CommonModule } from '@angular/common';
import { BeneficiaryRegisterComponent } from '../beneficiary-register/beneficiary-register.component';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule, CommonModule, BeneficiaryRegisterComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  payments: Payment[] = [];

  createPayment!: FormGroup;
  paymentCreated: boolean = false;
  displayBeneficiaryForm!: boolean;

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
      
      this.clientSvc.getClientUserById(user?.userId).subscribe((data) => {
        this.createPayment.patchValue({ payerAccountId: data.accountId });
        if (data && data.beneficiaries)
          this.beneficiaries = data.beneficiaries;
        this.displayBeneficiaryForm = this.beneficiaries.length == 0;
        // this.displayBeneficiaryForm = true;
        console.log(data)
      },
        (error) => {
          console.log(error);
          this.displayBeneficiaryForm = true;
        })
    }
  }

  makePayment() {
    console.log(this.createPayment.value)
    this.paymentSvc.createPayment(this.createPayment.value).subscribe((data) => {
      console.log(data);
      this.paymentCreated = true;
    },
      (error) => {
        console.log(error);
      }
    )
  }

  onBeneficiaryAdded(newBeneficiary: Beneficiary) {
    this.beneficiaries.push(newBeneficiary);
    this.displayBeneficiaryForm = false;
  }
}
