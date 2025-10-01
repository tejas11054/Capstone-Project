import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankRegisterService } from '../../Services/bankUser.service';
import { BankUser } from '../../Models/BankUser';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-bankuser.component.html',
  styleUrls: ['./admin-bankuser.component.css']
})
export class AdminComponent implements OnInit {

  banks: BankUser[] = [];
  processing: Record<number, boolean> = {};

  // Pagination
  pageNumber = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor(private bankService: BankRegisterService) {}

  ngOnInit(): void {
    this.fetchBankUsers();
  }

  fetchBankUsers() {
    this.banks = [];
    this.bankService.getAllBankUsers(this.pageNumber, this.pageSize).subscribe({
      next: (res: any) => {
        this.banks = res.data; // data array from backend
        this.totalRecords = res.totalRecords; // total records count from backend
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (err) => console.error('Error fetching bank users:', err)
    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.fetchBankUsers();
  }

  approveBankUser(bankUserId: number) {
    const bank = this.banks.find(b => b.userId === bankUserId);
    if (!bank) return;

    if (!confirm(`Do you really want to approve ${bank.userFullName || bank.userName}?`)) return;

    this.processing[bankUserId] = true;

    this.bankService.getBankUser(bankUserId).subscribe({
      next: (bankUser) => {
        this.bankService.approveBankUser(bankUserId, bankUser).subscribe({
          next: () => {
            this.fetchBankUsers();
            this.processing[bankUserId] = false;
          },
          error: () => this.processing[bankUserId] = false
        });
      },
      error: () => this.processing[bankUserId] = false
    });
  }

  rejectBankUser(bank: BankUser) {
    const id = bank.userId;
    if (!id) return;

    const reason = prompt(`Enter the reason for rejecting ${bank.userFullName || bank.userName}:`);
    if (!reason || reason.trim() === '') return alert('Rejection reason is required!');
    if (!confirm(`Do you really want to reject ${bank.userFullName || bank.userName}?`)) return;

    this.processing[id] = true;

    this.bankService.rejectBankUser(id, reason).subscribe({
      next: () => {
        alert('Bank user rejected successfully!');
        this.fetchBankUsers();
        this.processing[id] = false;
      },
      error: () => {
        alert('Failed to reject bank user!');
        this.processing[id] = false;
      }
    });
  }
}
