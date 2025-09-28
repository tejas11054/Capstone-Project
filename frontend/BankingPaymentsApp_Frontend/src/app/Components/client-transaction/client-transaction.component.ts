import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../Services/transaction.service';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-client-transactions',
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

  downloadPDF(): void {
    if (!this.transactions || this.transactions.length === 0) {
      alert('No transactions to export!');
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
        t.type,
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

  downloadExcel(): void {
  if (!this.transactions || this.transactions.length === 0) {
    alert('No transactions to export!');
    return;
  }

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
    this.transactions.map((t, i) => ({
      '#': i + 1,
      'Transaction ID': t.transactionId,
      'Type': t.type,
      'Amount': t.amount,
      'Date': new Date(t.createdAt).toLocaleString()
    }))
  );

  // Auto column width fix (use Record<string, number>)
  const colWidths: Record<string, number> = {};

  Object.keys(worksheet).forEach(key => {
    if (key.startsWith('!')) return; // skip metadata
    const col = key.replace(/[0-9]/g, ''); // extract column (e.g. "A", "B")
    const value = worksheet[key].v?.toString() || '';
    colWidths[col] = Math.max(colWidths[col] || 10, value.length + 5);
  });

  worksheet['!cols'] = Object.values(colWidths).map(w => ({ wch: w }));

  const workbook: XLSX.WorkBook = { Sheets: { Transactions: worksheet }, SheetNames: ['Transactions'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(data, `Transactions_User_${this.userId}.xlsx`);
}

}
