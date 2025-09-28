import { Component } from '@angular/core';
import { Transaction } from '../../../Models/Transaction';
import { TransactionService } from '../../../Services/transaction.service';
import { CommonModule } from '@angular/common';
import { TransactionTypePipe } from '../../../Pipes/transaction-type.pipe';
import { StatusFilterComponent } from '../../Filters/status-filter/status-filter.component';
import { NameFilterComponent } from '../../Filters/name-filter/name-filter.component';
import { IdFilterComponent } from '../../Filters/id-filter/id-filter.component';
import { AccountNumberFilterComponent } from '../../Filters/account-number-filter/account-number-filter.component';
import { AmountFilterComponent } from '../../Filters/amount-filter/amount-filter.component';
import { DateFilterComponent } from '../../Filters/date-filter/date-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  imports: [CommonModule,TransactionTypePipe,ReactiveFormsModule, DateFilterComponent, AmountFilterComponent, AccountNumberFilterComponent, IdFilterComponent, NameFilterComponent, StatusFilterComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  transactions: Transaction[] = [];
  filters: any = {};
  totalTransactionAmount: number = 0;

  statusOptions = [
    { id: 1, name: 'Credit' },
    { id: 2, name: 'Debit' },
    { id: 3, name: 'pending' }
  ];

  constructor(private transactionSvc: TransactionService) { }

  ngOnInit() {
    // this.filters.clientId = 2;
    const params = new URLSearchParams(this.filters).toString();
    this.fetchTransactions(params);
  }

  fetchTransactions(params: string) {
    this.transactionSvc.getAllTransaction(params).subscribe((data) => {
      console.log(data);
      this.transactions = data;
    },
      (error) => {
        console.log(error);
      }

    );
  }

  onDateFilter(dates: { dateFrom: string; dateTo: string }) {

    this.filters.createdFrom = dates.dateFrom;
    this.filters.createdTo = dates.dateTo;
    console.log(this.filters);

    const params = new URLSearchParams(this.filters).toString();
    this.fetchTransactions(params);
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
    this.fetchTransactions(params);
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
    this.fetchTransactions(params);
  }

  fetchById(value: { id: number }) {
    if (value.id == 0) {
      const params = new URLSearchParams(this.filters).toString();
      this.fetchTransactions(params);
    }

    this.transactionSvc.getTransactionById(value.id).subscribe((data) => {
      console.log(data);
      this.transactions = [data];
    },
      (error) => {
        console.log(error);
      })
  }

  onNameFilter(name: { payerName: string }) {
    this.filters.payerName = name.payerName;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchTransactions(params);
  }

  onStatusFilter(status: { paymentStatusId: string }) {
    this.filters.paymentStatusId = status.paymentStatusId;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchTransactions(params);
  }


}
