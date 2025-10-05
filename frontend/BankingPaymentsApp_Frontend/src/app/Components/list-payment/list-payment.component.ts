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
import { RouterLink } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from '../../Services/auth.service';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-list-payment',
  imports: [CommonModule, RouterLink, PaymentStatusPipe, RejectModalComponent, ReactiveFormsModule, DateFilterComponent, AmountFilterComponent, AccountNumberFilterComponent, IdFilterComponent, NameFilterComponent, StatusFilterComponent],
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css'],
  standalone: true
})
export class ListPaymentComponent implements OnInit {

  payments!: Payment[];
  filters: any = {};
  @ViewChild("rejectModal") formModal!: RejectModalComponent;
  selectedPayment: any = null;
  role!: string | null;
  totalPaymentAmount!: number;
  pending!: number;
  approved!: number;
  rejected!: number;

  statusOptions = [
    { id: 1, name: 'Approved' },
    { id: 2, name: 'Declined' },
    { id: 3, name: 'pending' }
  ];

  constructor(private auth: AuthService, private notify: NotificationService , private paymentSvc: PaymentService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const user = this.auth.getLoggedInUser();
    const role = this.auth.getUserRole();
    console.log(role);
    if (role == "CLIENT_USER") {
      console.log("helo")
      console.log(user?.userId)
      this.role = role;
      this.filters.clientId = user?.userId;
    }
    this.role = role;
    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }

  fetchAllPayments(params: string) {
    this.paymentSvc.getAllPayments(params).subscribe((data) => {
      console.log(data);
      // const pendingPayments = data.filter(e => e.paymentStatusId == 3);
      // this.payments = pendingPayments;
      this.payments = data;
      this.totalPaymentAmount = data.reduce((sum, p) => sum + p.amount, 0);
      this.approved = data.filter(p => p.paymentStatusId == 1).length;
      this.rejected = data.filter(p => p.paymentStatusId == 2).length;
      this.pending = data.filter(p => p.paymentStatusId == 3).length;
    },
      error => console.log(error)
    )
  }

  approvePayment(payment: Payment) {
    console.log(payment);
    this.paymentSvc.approvePayment(payment).subscribe((data) => {
      console.log(data);
      this.notify.success("Payment sucessfully approved");
      const params = new URLSearchParams(this.filters).toString();
      this.fetchAllPayments(params);
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
      this.notify.success("Payment sucessfully Rejected");
      const params = new URLSearchParams(this.filters).toString();
      this.fetchAllPayments(params);
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

  onAmountFilter(amount: { minAmount: string | null, maxAmount: string | null }) {
    console.log(this.filters);

    if (amount.minAmount !== null) {
      this.filters.minAmount = amount.minAmount;
    } else {
      delete this.filters.minAmount; // ✅ remove old value
    }
    if (amount.maxAmount !== null) {
      this.filters.maxAmount = amount.maxAmount;
    } else {
      delete this.filters.maxAmount; // ✅ remove old value
    }

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }

  onAccountFilter(account: { payeeAccountNumber: string | null }) {
    // this.filters.payeeAccountNumber = account.payeeAccountNumber;
    console.log(this.filters);
    if (account.payeeAccountNumber !== null) {
      this.filters.payeeAccountNumber = account.payeeAccountNumber;
    } else {
      console.log("Before delete:", this.filters);
      delete this.filters.payeeAccountNumber;
      console.log("After delete:", this.filters); // ✅ remove old value
    }

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }

  fetchById(value: { id: number }) {
    if (value.id == 0 || value.id == null) {
      const params = new URLSearchParams(this.filters).toString();
      this.fetchAllPayments(params);
      return;
    }

    this.paymentSvc.getPaymentById(value.id).subscribe((data) => {
      console.log(data);
      this.payments = [data];
    },
      (error) => {
        console.log(error);
      })
  }

  onNameFilter(name: { payerName: string }) {
    this.filters.payerName = name.payerName;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }

  onStatusFilter(status: { paymentStatusId: string }) {
    this.filters.paymentStatusId = status.paymentStatusId;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }

  downloadPDF(): void {
    if (!this.payments || this.payments.length === 0) {
      this.notify.error('No payments to export!');
      return;
    }

    const doc = new jsPDF();
    doc.text('Payments Report', 14, 16);

    const tableColumn = ['#', 'Client Name', 'Paid To', 'status', 'amount', 'createdAt'];
    const tableRows: any[] = [];

    this.payments.forEach((t, i) => {
      tableRows.push([
        i + 1,
        t.payerAccount?.clientUser?.userFullName,
        t.payeeAccountNumber,
        t.paymentStatusId==3?"PENDING":t.paymentStatusId == 1?"APPROVED":"REJECTED",
        t.amount,
        new Date(t.createdAt).toLocaleString()
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save(`Payments_User_${this.payments[0].payerAccountId}.pdf`);
  }
}
