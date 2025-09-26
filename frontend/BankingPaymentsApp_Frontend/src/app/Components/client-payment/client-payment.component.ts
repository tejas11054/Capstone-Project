import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientRegisterService } from '../../Services/client.service';
import { PaymentService } from '../../Services/payment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'client-payment.component.html',
  styleUrls: ['client-payment.component.css']
})
export class ClientPaymentComponent implements OnInit {
  userId!: number;
  payments: any[] = [];
  filteredPayments: any[] = [];
  loading = true;

  // Filters
  filterAmount: number | null = null;
  filterPayee: string = '';
  filterDate: string = ''; // YYYY-MM-DD

  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private paymentSvc: PaymentService
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('userId');
    const idFromStorage = localStorage.getItem('userId');
    this.userId = idFromRoute ? +idFromRoute : idFromStorage ? +idFromStorage : 0;

    if (this.userId) {
      this.loadClientPayments();
    } else {
      console.error('User ID is invalid!');
      this.loading = false;
    }
  }

  loadClientPayments(): void {
  this.clientSvc.getClientById(this.userId).subscribe({
    next: (clientData: any) => {
      console.log('Client Response:', clientData);

      // Pick only the important fields
      this.payments = [
        {
          accountId: clientData.account?.accountId,
          accountNumber: clientData.account?.accountNumber,
          balance: clientData.account?.balance,
          bankName: clientData.account?.bank?.bankName,
          userFullName: clientData.userFullName,
          userEmail: clientData.userEmail,
          userPhone: clientData.userPhone,
          branch: clientData.bankUser?.branch,
          employees: clientData.employees?.map((e: any) => ({
            employeeId: e.employeeId,
            employeeName: e.employeeName,
            bankName: e.bankName,
            accountNumber: e.accountNumber,
            salary: e.salary,
            isActive: e.isActive
          })) || []
        }
      ];

      this.filteredPayments = [...this.payments];
      this.loading = false;
    },
    error: err => {
      console.error('Error fetching client:', err);
      this.loading = false;
    }
  });
}

  applyFilters(): void {
    this.filteredPayments = this.payments.filter(p => {
      const matchesAmount = this.filterAmount ? p.amount === this.filterAmount : true;
      const matchesPayee = this.filterPayee
        ? p.payeeAccountNumber.toLowerCase().includes(this.filterPayee.toLowerCase())
        : true;
      const matchesDate = this.filterDate
        ? new Date(p.createdAt).toISOString().startsWith(this.filterDate)
        : true;

      return matchesAmount && matchesPayee && matchesDate;
    });
  }

  resetFilters(): void {
    this.filterAmount = null;
    this.filterPayee = '';
    this.filterDate = '';
    this.filteredPayments = [...this.payments];
  }
}
