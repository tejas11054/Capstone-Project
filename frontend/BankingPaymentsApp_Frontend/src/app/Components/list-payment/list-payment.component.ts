import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../Services/payment.service';
import { Payment } from '../../Models/Payment';
import { CommonModule } from '@angular/common';
import { PaymentStatusPipe } from '../../Pipes/payment-status.pipe';
import { RejectDTO } from '../../DTO/RejectDTO';
import { RejectModalComponent } from '../Shared/reject-modal/reject-modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateFilterComponent } from '../Filters/date-filter/date-filter.component';
import { AmountFilterComponent } from '../Filters/amount-filter/amount-filter.component';
import { AccountNumberFilterComponent } from '../Filters/account-number-filter/account-number-filter.component';
import { IdFilterComponent } from '../Filters/id-filter/id-filter.component';
import { NameFilterComponent } from '../Filters/name-filter/name-filter.component';
import { StatusFilterComponent } from '../Filters/status-filter/status-filter.component';

@Component({
  selector: 'app-list-payment',
  imports: [CommonModule, PaymentStatusPipe, RejectModalComponent, ReactiveFormsModule, DateFilterComponent, AmountFilterComponent, AccountNumberFilterComponent, IdFilterComponent, NameFilterComponent, StatusFilterComponent],
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css'],
  standalone: true
})
export class ListPaymentComponent implements OnInit {

  payments!: Payment[];
  filters: any = {};
  @ViewChild("rejectModal") formModal!: RejectModalComponent;
  selectedPayment: any = null;

  constructor(private paymentSvc: PaymentService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }

  fetchAllPayments(params: string) {
    this.paymentSvc.getAllPayments(params).subscribe((data) => {
      console.log(data);
      // const pendingPayments = data.filter(e => e.paymentStatusId == 3);
      // this.payments = pendingPayments;
      this.payments = data;
    },
      error => console.log(error)
    )
  }

  approvePayment(payment: Payment) {
    console.log(payment);
    this.paymentSvc.approvePayment(payment).subscribe((data) => {
      console.log(data);
      alert("payment sucessfully approved");
    },
      (error) => {
        console.log(error);
      })
  }

  openFormModal(payment: Payment) {
    this.selectedPayment = {
      id: payment.paymentId
    };
    this.formModal.open(payment.paymentId);
  }

  handleFormSubmit(rejectForm: any) {
    console.log("data in parent=> " + rejectForm)
    this.rejectPayment(rejectForm);
  }


  rejectPayment(reject: RejectDTO) {
    this.paymentSvc.rejectPayment(reject).subscribe((data) => {
      console.log(data);
      alert("payment sucessfully Rejected");
    },
      (error) => {
        console.log(error);
      })
  }

  onDateFilter(dates: { dateFrom: string; dateTo: string }) {

    this.filters.createdFrom = dates.dateFrom;
    this.filters.createdTo = dates.dateTo;
    console.log(this.filters);

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }

  onAmountFilter(amount:{minAmount:string, maxAmount:string}){
    this.filters.minAmount = amount.minAmount;
    this.filters.maxAmount = amount.maxAmount;
    console.log(this.filters);

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }

  onAccountFilter(account:{accountNumber:string}){
    this.filters.accountNumber = account.accountNumber;
    console.log(this.filters);

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }
}
