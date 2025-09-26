import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../Services/transaction.service';
import { FormsModule } from '@angular/forms'; // for ngModel

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-transaction.component.html',
  styleUrls: ['./client-transaction.component.css']
})
export class ClientTransactionComponent implements OnInit {
  userId!: number;
  allTransactions: any[] = []; // original client transactions
  transactions: any[] = []; // displayed transactions
  loading = true;

  // Filter fields
  filterTransactionId?: number;
  filterTransactionType?: string; // 'Credit' or 'Debit'
  filterDate?: string; // 'YYYY-MM-DD'

  constructor(
    private route: ActivatedRoute,
    private transactionSvc: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('userId');
    this.userId = idFromRoute ? +idFromRoute : 0;

    if (this.userId) {
      this.loadTransactions();
    } else {
      console.error('Invalid User ID');
    }
  }

  loadTransactions(): void {
    this.loading = true;

    // Load all transactions for this client user
    this.transactionSvc.getTransactions(this.userId).subscribe({
      next: (data: any[]) => {
        this.allTransactions = data.map(t => ({
          transactionId: t.transactionId,
          type: t.transactionType?.type === 1 ? 'Credit' : 'Debit',
          amount: t.amount,
          createdAt: t.createdAt
        }));
        this.transactions = [...this.allTransactions]; // initialize display
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching transactions:', err);
        this.loading = false;
      }
    });
  }

 applyFilters(): void {
  let filtered = [...this.allTransactions];

  if (this.filterTransactionId) {
    filtered = filtered.filter(t => t.transactionId === this.filterTransactionId);
  }

  if (this.filterTransactionType) {
    const ft = this.filterTransactionType.toLowerCase();
    filtered = filtered.filter(t => t.type?.toLowerCase() === ft);
  }

  if (this.filterDate) {
    const filterDateObj = new Date(this.filterDate);
    filtered = filtered.filter(
      t => new Date(t.createdAt).toDateString() === filterDateObj.toDateString()
    );
  }

  this.transactions = filtered;
}


  resetFilters(): void {
    this.filterTransactionId = undefined;
    this.filterTransactionType = '';
    this.filterDate = '';
    this.transactions = [...this.allTransactions];
  }

  goBack(): void {
    this.router.navigate(['/ClientUser/' + this.userId]);
  }
}