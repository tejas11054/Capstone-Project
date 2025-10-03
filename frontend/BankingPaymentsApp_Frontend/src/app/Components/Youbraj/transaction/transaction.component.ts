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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from '../../../Services/auth.service';
import { NotificationService } from '../../../Services/notification.service';

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
  userId!:number;

  statusOptions = [
    { id: 1, name: 'Credit' },
    { id: 2, name: 'Debit' },
    { id: 3, name: 'pending' }
  ];

  constructor(private auth:AuthService, private transactionSvc: TransactionService, private notify: NotificationService ) { }

  ngOnInit() {
    const user = this.auth.getLoggedInUser();
    const role = this.auth.getUserRole();
    console.log(role);
    if(role == "CLIENT_USER"){
      console.log("helo")
      console.log(user?.userId)
      this.filters.clientId =  user?.userId;
    }
    this.userId = this.auth.getUserId()??0;
    // this.filters.clientId = 2;
    const params = new URLSearchParams(this.filters).toString();
    this.fetchTransactions(params);
  }

  fetchTransactions(params: string) {
    this.transactionSvc.getAllTransaction(params).subscribe((data) => {
      console.log(data);
      this.transactions = data;
      let credit = data.filter(t=>t.transactionTypeId==1).reduce((sum, t) => sum + t.amount, 0);
      let debit = data.filter(t=>t.transactionTypeId==2).reduce((sum, t) => sum + t.amount, 0);
      this.totalTransactionAmount = credit - debit;
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
      this.filters.toFrom = account.payeeAccountNumber;
    } else {
      delete this.filters.toFrom; // ✅ remove old value
    }
    console.log(this.filters);

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
    this.filters.transactionTypeId = status.paymentStatusId;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchTransactions(params);
  }

  downloadPDF(): void {
    if (!this.transactions || this.transactions.length === 0) {
      this.notify.error('No transactions to export!');
      return;
    }

    const doc = new jsPDF();
    doc.text('Transactions Report', 14, 16);

    const tableColumn = ['#', 'Transaction ID', 'Type', 'Amount', 'Date'];
    const tableRows: any[] = [];

    this.transactions.forEach((t, i) => {
      tableRows.push([
        i + 1,
        t.transactionId,
        t.transactionTypeId,
        t.amount,
        new Date(t.createdAt).toLocaleString()
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save(`Transactions_User_${this.userId}.pdf`);
  }


  // getEmployeeAccountByTXnId(id:number){
  //   let detail = this.transactions[id].salaryDisbursement?.disbursementDetails?.find(d=>d.transactionId==id);
  //   if(detail){
  //     return detail.
  //   }
  // }

  getBeneficiaryFromTxn(txn:Transaction){
    
  }
}
