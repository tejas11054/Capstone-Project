import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientRegisterService } from '../../Services/client.service';
import { TransactionService } from '../../Services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '/client-transaction.component.html',
  styleUrls: ['/client-transaction.component.css']
})
export class ClientTransactionComponent implements OnInit {
  userId!: number;
  transactionIds: number[] = [];
  transactions: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private transactionSvc: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('userId');
    this.userId = idFromRoute ? +idFromRoute : 0;

    if (this.userId) {
      this.loadClientTransactions();
    } else {
      console.error('Invalid User ID');
    }
  }

  loadClientTransactions(): void {
  this.clientSvc.getClientById(this.userId).subscribe({
    next: (clientData: any) => {
      this.transactionIds = clientData.account.transactionIds || [];
      if (this.transactionIds.length === 0) {
        this.loading = false;
        return;
      }

      const requests = this.transactionIds.map(id =>
        this.transactionSvc.getTransactionById(id)
      );

      Promise.all(requests.map(r => r.toPromise())).then(results => {
        // Map only required fields
        this.transactions = results.map((t: any) => ({
          transactionId: t.transactionId,
          type: t.transactionType?.type === 1 ? 'Credit' : 'Debit',
          amount: t.amount,
          createdAt: t.createdAt
        }));
        this.loading = false;
      }).catch(err => {
        console.error('Error fetching transactions:', err);
        this.loading = false;
      });
    },
    error: err => {
      console.error('Error fetching client:', err);
      this.loading = false;
    }
  });
}

goBack(): void {
    this.router.navigate(["/ClientUser/" + this.userId]);  // navigates to previous page
  }

}
