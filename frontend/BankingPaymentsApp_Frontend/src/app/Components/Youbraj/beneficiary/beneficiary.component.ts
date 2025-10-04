import { Component } from '@angular/core';
import { Beneficiary } from '../../../Models/Beneficiary';
import { BeneficiaryService } from '../../../Services/beneficiary.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StatusFilterComponent } from '../../Filters/status-filter/status-filter.component';
import { NameFilterComponent } from '../../Filters/name-filter/name-filter.component';
import { IdFilterComponent } from '../../Filters/id-filter/id-filter.component';
import { AccountNumberFilterComponent } from '../../Filters/account-number-filter/account-number-filter.component';
import { AmountFilterComponent } from '../../Filters/amount-filter/amount-filter.component';
import { DateFilterComponent } from '../../Filters/date-filter/date-filter.component';
import { RejectModalComponent } from '../../Shared/reject-modal/reject-modal.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from '../../../Services/auth.service';
import { NotificationService } from '../../../Services/notification.service';

@Component({
  selector: 'app-beneficiary',
  imports: [CommonModule, RouterLink, RejectModalComponent, ReactiveFormsModule, DateFilterComponent, AmountFilterComponent, AccountNumberFilterComponent, IdFilterComponent, NameFilterComponent, StatusFilterComponent],
  templateUrl: './beneficiary.component.html',
  styleUrl: './beneficiary.component.css'
})
export class BeneficiaryComponent {
  beneficiaries!: Beneficiary[];
  filters: any = {};

  constructor(private auth: AuthService, private notify: NotificationService , private beneficiarySvc: BeneficiaryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const user = this.auth.getLoggedInUser();
    const role = this.auth.getUserRole();
    console.log(role);
    if (role == "CLIENT_USER") {
      console.log("helo")
      console.log(user?.userId)
      this.filters.clientId = user?.userId;
    }
    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllBeneficiaries(params);
  }

  fetchAllBeneficiaries(params: string) {
    this.beneficiarySvc.getAllBeneficiaries(params).subscribe((data) => {
      console.log(data);
      // const pendingPayments = data.filter(e => e.paymentStatusId == 3);
      // this.payments = pendingPayments;
      this.beneficiaries = data;
    },
      error => console.log(error)
    )
  }

  deleteBeneficiary(beneficiary: Beneficiary) {
    this.beneficiarySvc.deleteBeneficiary(beneficiary.beneficiaryId).subscribe((data) => {
      console.log(data);
      alert(`${beneficiary.beneficiaryName} has been deleted!`)
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
    this.fetchAllBeneficiaries(params);
  }

  onAmountFilter(amount: { minAmount: string | null, maxAmount: string | null }) {
    this.filters.minAmount = amount.minAmount;
    this.filters.maxAmount = amount.maxAmount;
    console.log(this.filters);

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllBeneficiaries(params);
  }

  onAccountFilter(account: { payeeAccountNumber: string | null }) {
    console.log(this.filters);
    if (account.payeeAccountNumber !== null) {
      this.filters.accountNumber = account.payeeAccountNumber;
    } else {
      console.log("Before delete:", this.filters);
      delete this.filters.accountNumber;
      console.log("After delete:", this.filters); // ✅ remove old value
    }

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllBeneficiaries(params);
  }

  fetchById(value: { id: number }) {
    if (value.id == 0) {
      const params = new URLSearchParams(this.filters).toString();
      this.fetchAllBeneficiaries(params);
    }

    this.beneficiarySvc.getBeneficiaryById(value.id).subscribe((data) => {
      console.log(data);
      this.beneficiaries = [data];
    },
      (error) => {
        console.log(error);
      })
  }

  onNameFilter(name: { payerName: string }) {
    this.filters.beneficiaryName = name.payerName;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllBeneficiaries(params);
  }

  onStatusFilter(status: { paymentStatusId: string }) {
    this.filters.paymentStatusId = status.paymentStatusId;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllBeneficiaries(params);
  }

  downloadPDF(): void {
    if (!this.beneficiaries || this.beneficiaries.length === 0) {
      this.notify.error('No beneficiaries to export!');
      return;
    }

    const doc = new jsPDF();
    doc.text('Beneficiaries Report', 14, 16);

    const tableColumn = ['#', 'ClientID', 'AccountNumber', 'BeneficiaryName', 'Bank', 'IFSC'];
    const tableRows: any[] = [];

    this.beneficiaries.forEach((t, i) => {
      tableRows.push([
        i + 1,
        t.clientId,
        t.accountNumber,
        t.beneficiaryName,
        t.bankName,
        t.ifsc
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save(`Beneficiary_${this.beneficiaries[0].clientId}.pdf`);
  }
}
