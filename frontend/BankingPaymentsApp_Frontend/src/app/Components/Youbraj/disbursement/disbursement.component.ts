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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from '../../../Services/auth.service';
import { NotificationService } from '../../../Services/notification.service';

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
  role!: string | null;
  @ViewChild("rejectModal") formModal!: RejectModalComponent;
  totalDisbursementAmount!: number;
  pending!: number;
  approved!: number;
  declined!: number;


  statusOptions = [
    { id: 1, name: 'Approved' },
    { id: 2, name: 'Declined' },
    { id: 3, name: 'pending' }
  ];

  constructor(private auth: AuthService, private notify: NotificationService, private disbursementSvc: SalaryDisbursementService) { }

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
    this.disbursementSvc.getAllSalaryDisbursement(params).subscribe((data) => {
      console.log(data);
      // const pendingPayments = data.filter(e => e.paymentStatusId == 3);
      // this.payments = pendingPayments;
      this.disbursements = data;
      this.totalDisbursementAmount = data.reduce((sum, d) => sum + d.totalAmount, 0);
      this.approved = data.filter(d => d.disbursementStatusId == 1).length;
      this.declined = data.filter(d => d.disbursementStatusId == 2).length;
      this.pending = data.filter(d => d.disbursementStatusId == 3).length;
    },
      error => console.log(error)
    )
  }

  approveDisbursement(disbursement: SalaryDisbursement) {
    console.log(disbursement);
    this.disbursementSvc.approveSalaryDisbursement(disbursement.salaryDisbursementId).subscribe((data) => {
      console.log(data);
      this.notify.success("Payment sucessfully approved");
      const params = new URLSearchParams(this.filters).toString();
      this.fetchAllPayments(params);
    },
      (error) => {
        this.notify.warning("Insufficient Bank Balance!!!!");
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
      this.notify.success("Disbursement sucessfully Rejected");
      const params = new URLSearchParams(this.filters).toString();
      this.fetchAllPayments(params);
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

  downloadPDF(): void {
    if (!this.disbursements || this.disbursements.length === 0) {
      this.notify.error('No disbursements to export!');
      return;
    }

    const doc = new jsPDF();
    doc.text('Disbursements Report', 14, 16);

    const tableColumn = ['#', 'Client Name', 'Total Amount', 'Status', 'Employees', "Date"];
    const tableRows: any[] = [];

    this.disbursements.forEach((t, i) => {
      tableRows.push([
        i + 1,
        t.clientUser?.userFullName,
        t.totalAmount,
        t.disbursementStatusId == 3 ? "PENDING" : t.disbursementStatusId == 1 ? "APPROVED" : "DECLINED",
        t.employees?.length == 0 ? t.clientUser?.employees?.length : t.employees?.length,
        new Date(t.disbursementDate).toLocaleString()
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save(`Disbursement_User_${this.disbursements[0].clientId}.pdf`);
  }
}
