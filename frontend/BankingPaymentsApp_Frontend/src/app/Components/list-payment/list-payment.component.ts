import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../Services/payment.service';
import { Payment } from '../../Models/Payment';
import { CommonModule } from '@angular/common';
import { PaymentStatusPipe } from '../../Pipes/payment-status.pipe';
import { RejectDTO } from '../../DTO/RejectDTO';
import { RejectModalComponent } from '../Shared/reject-modal/reject-modal.component';

@Component({
  selector: 'app-list-payment',
  imports: [CommonModule, PaymentStatusPipe, RejectModalComponent],
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css'],
  standalone: true
})
export class ListPaymentComponent implements OnInit {

  payments!: Payment[];
  @ViewChild("rejectModal") formModal!: RejectModalComponent;
  selectedPayment: any = null;
  constructor(private paymentSvc: PaymentService) { }

  ngOnInit(): void {
    this.paymentSvc.getAllPayments().subscribe((data) => {
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

  handleFormSubmit(rejectForm:any) {
      console.log("data in parent=> " + rejectForm)
      this.rejectPayment(rejectForm);
  }


  rejectPayment(reject:RejectDTO) {
    this.paymentSvc.rejectPayment(reject).subscribe((data) => {
      console.log(data);
      alert("payment sucessfully Rejected");
    },
      (error) => {
        console.log(error);
      })
  }
}
