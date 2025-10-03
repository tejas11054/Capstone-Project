import { Component, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ClientUser } from '../../../Models/ClientUser';
import { ClientRegisterService } from '../../../Services/client.service';
import { StatusFilterComponent } from '../../Filters/status-filter/status-filter.component';
import { NameFilterComponent } from '../../Filters/name-filter/name-filter.component';
import { IdFilterComponent } from '../../Filters/id-filter/id-filter.component';
import { AccountNumberFilterComponent } from '../../Filters/account-number-filter/account-number-filter.component';
import { AmountFilterComponent } from '../../Filters/amount-filter/amount-filter.component';
import { DateFilterComponent } from '../../Filters/date-filter/date-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RejectModalComponent } from '../../Shared/reject-modal/reject-modal.component';
import { PaymentStatusPipe } from '../../../Pipes/payment-status.pipe';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RejectDTO } from '../../../DTO/RejectDTO';
import { AuthService } from '../../../Services/auth.service';
import { NotificationService } from '../../../Services/notification.service';

@Component({
  selector: 'app-list-clients',
  imports: [CommonModule, RouterLink, PaymentStatusPipe, RejectModalComponent, ReactiveFormsModule, DateFilterComponent, AmountFilterComponent, AccountNumberFilterComponent, IdFilterComponent, NameFilterComponent, StatusFilterComponent],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css'
})
export class ListClientsComponent implements OnInit {
  clients!: ClientUser[];
  filters: any = {};
  selectedClient!: any;
  approved!: number;
  pending!: number;

  @ViewChild("rejectModal") formModal!: RejectModalComponent;

  statusOptions = [
    { id: 1, name: 'Approved' },
    { id: 2, name: 'Declined' },
    { id: 3, name: 'pending' }
  ];

  constructor(private clientSvc: ClientRegisterService, private auth: AuthService, private notify: NotificationService ) { }

  ngOnInit(): void {
    let userId = this.auth.getUserId();
    this.filters.BankUserId = userId;
    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllClients(params);
  }

  fetchAllClients(params: string) {
    this.clientSvc.getClients(params).subscribe((data) => {
      console.log(data);
      this.clients = data;
      this.pending = data.filter(d => d.kycVierified == false).length;
      this.approved = data.filter(d => d.kycVierified == true).length;
    },
      (error) => {
        console.log(error);
      })
  }

  approveClient(client: ClientUser) {
    console.log(client);
    this.clientSvc.approveClient(client.userId).subscribe((data) => {
      console.log(data);
      this.notify.success("Client sucessfully approved");
      const params = new URLSearchParams(this.filters).toString();
      this.fetchAllClients(params);
    },
      (error) => {
        console.log(error);
      })
  }

  openFormModal(client: ClientUser) {
    this.selectedClient = {
      id: client.userId
    };
    this.formModal.open(client.userId);
  }

  handleFormSubmit(rejectForm: any) {
    console.log("data in parent=> " + rejectForm)
    this.rejectPayment(rejectForm);
  }


  rejectPayment(reject: RejectDTO) {
    this.clientSvc.rejectClient(reject).subscribe((data) => {
      console.log(data);
      this.notify.warning(data);
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
    this.fetchAllClients(params);
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
    this.fetchAllClients(params);
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
    this.fetchAllClients(params);
  }

  onIdFilter(value: { id: number }) {
    if (value.id == 0) {
      const params = new URLSearchParams(this.filters).toString();
      this.fetchAllClients(params);
    }

    this.clientSvc.getClientById(value.id).subscribe((data) => {
      console.log(data);
      this.clients = [data];
    },
      (error) => {
        console.log(error);
      })
  }

  onNameFilter(name: { payerName: string }) {
    this.filters.payerName = name.payerName;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllClients(params);
  }

  onStatusFilter(status: { paymentStatusId: string }) {
    this.filters.paymentStatusId = status.paymentStatusId;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllClients(params);
  }

  downloadPDF(): void {
    if (!this.clients || this.clients.length === 0) {
      this.notify.error('No Employees to export!');
      return;
    }

    const doc = new jsPDF();
    doc.text('Employees Report', 14, 16);

    const tableColumn = ['#', 'User ID', 'Username', 'Email', 'KYC', 'Bank', 'Account Number', 'joining Date'];
    const tableRows: any[] = [];

    this.clients.forEach((t, i) => {
      tableRows.push([
        i + 1,
        t.userId,
        t.userName,
        t.userEmail,
        t.kycVierified,
        t.bank.bankName,
        t.account?.accountNumber,
        new Date(t.userJoiningDate).toLocaleDateString(),
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save(`clients_User_${this.clients[0].userId}.pdf`);
  }
}
