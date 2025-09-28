import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SalaryDisbursement } from '../../../Models/SalaryDisbursement';
import { PaymentStatusPipe } from '../../../Pipes/payment-status.pipe';
import { SalaryDisbursementService } from '../../../Services/salary-disbursement.service';
import { RouterLink } from '@angular/router';
import { StatusFilterComponent } from '../../Filters/status-filter/status-filter.component';
import { NameFilterComponent } from '../../Filters/name-filter/name-filter.component';
import { IdFilterComponent } from '../../Filters/id-filter/id-filter.component';
import { AccountNumberFilterComponent } from '../../Filters/account-number-filter/account-number-filter.component';
import { AmountFilterComponent } from '../../Filters/amount-filter/amount-filter.component';
import { DateFilterComponent } from '../../Filters/date-filter/date-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RejectModalComponent } from '../../Shared/reject-modal/reject-modal.component';
import { RejectDTO } from '../../../DTO/RejectDTO';

@Component({
  selector: 'app-disbursement',
  imports: [CommonModule, PaymentStatusPipe, RouterLink, RejectModalComponent, ReactiveFormsModule, DateFilterComponent, AmountFilterComponent, AccountNumberFilterComponent, IdFilterComponent, NameFilterComponent, StatusFilterComponent],
  templateUrl: './disbursement.component.html',
  styleUrl: './disbursement.component.css'
})
export class DisbursementComponent implements OnInit {
  disbursements!: SalaryDisbursement[];
  filters: any = {};
  selectedDisbursement: any = {};
  @ViewChild("rejectModal") formModal!: RejectModalComponent;

  statusOptions = [
    { id: 1, name: 'Approved' },
    { id: 2, name: 'Declined' },
    { id: 3, name: 'pending' }
  ];

  constructor(private disbursementSvc: SalaryDisbursementService) { }

  ngOnInit(): void {
    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }

  fetchAllPayments(params: string) {
    this.disbursementSvc.getAllSalaryDisbursement(params).subscribe((data) => {
      console.log(data);
      // const pendingPayments = data.filter(e => e.paymentStatusId == 3);
      // this.payments = pendingPayments;
      this.disbursements = data;
    },
      error => console.log(error)
    )
  }

  approveDisbursement(disbursement: SalaryDisbursement) {
    console.log(disbursement);
    this.disbursementSvc.approveSalaryDisbursement(disbursement.salaryDisbursementId).subscribe((data) => {
      console.log(data);
      alert("payment sucessfully approved");
    },
      (error) => {
        console.log(error);
      })
  }

  openFormModal(disbursement: SalaryDisbursement) {
    this.selectedDisbursement = {
      id: disbursement.salaryDisbursementId
    };
    this.formModal.open(disbursement.salaryDisbursementId);
  }

  handleFormSubmit(rejectForm: any) {
    console.log("data in parent=> " + rejectForm)
    this.rejectPayment(rejectForm);
  }


  rejectPayment(reject: RejectDTO) {
    this.disbursementSvc.rejectSalaryDisbursement(reject).subscribe((data) => {
      console.log(data);
      alert("disbursement sucessfully Rejected");
    },
      (error) => {
        console.log(error);
      })
  }

  onDateFilter(dates: { dateFrom: string; dateTo: string }) {

    this.filters.disbursementFrom = dates.dateFrom;
    this.filters.disbursementTo = dates.dateTo;
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
      delete this.filters.payeeAccountNumber; // ✅ remove old value
    }

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }

  fetchById(value: { id: number }) {
    if (value.id == 0) {
      const params = new URLSearchParams(this.filters).toString();
      this.fetchAllPayments(params);
    }

    this.disbursementSvc.getSalaryDisbursementById(value.id).subscribe((data) => {
      console.log(data);
      this.disbursements = [data];
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
    this.filters.disbursementStatusId = status.paymentStatusId;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllPayments(params);
  }
}
