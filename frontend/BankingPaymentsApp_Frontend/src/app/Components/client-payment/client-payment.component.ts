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
        const paymentIds = clientData.account?.paymentIds || [];
        if (paymentIds.length === 0) {
          this.loading = false;
          return;
        }

        const requests = paymentIds.map((id: number) => this.paymentSvc.getPaymentById(id));

        Promise.all(requests.map((r: { toPromise: () => any; }) => r.toPromise())).then(results => {
          // Map only required fields
          this.payments = results.map((p: any) => ({
            paymentId: p.paymentId,
            payerAccountNumber: p.payerAccount?.accountNumber,
            payeeAccountNumber: p.payeeAccountNumber,
            amount: p.amount,
            paymentStatus: p.paymentStatus?.status || 'Pending',
            createdAt: p.createdAt,
            actionAt: p.actionAt
          }));

          this.filteredPayments = [...this.payments]; // initialize filtered list
          this.loading = false;
        }).catch(err => {
          console.error('Error fetching payments:', err);
          this.loading = false;
        });
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
