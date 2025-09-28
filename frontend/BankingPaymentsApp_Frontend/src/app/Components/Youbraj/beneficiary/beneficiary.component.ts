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

@Component({
  selector: 'app-beneficiary',
  imports: [CommonModule, RouterLink, RejectModalComponent, ReactiveFormsModule, DateFilterComponent, AmountFilterComponent, AccountNumberFilterComponent, IdFilterComponent, NameFilterComponent, StatusFilterComponent],
  templateUrl: './beneficiary.component.html',
  styleUrl: './beneficiary.component.css'
})
export class BeneficiaryComponent {
  beneficiaries!: Beneficiary[];
  filters: any = {};

  constructor(private beneficiarySvc: BeneficiaryService, private fb: FormBuilder) { }

  ngOnInit(): void {
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
    this.filters.accountNumber = account.payeeAccountNumber;
    console.log(this.filters);

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
}
