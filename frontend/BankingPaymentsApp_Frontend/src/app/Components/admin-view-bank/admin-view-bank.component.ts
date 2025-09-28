import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankService } from '../../Services/bank.service';
import { Bank } from '../../Models/Bank';
import { BankDTO } from '../../DTO/BankDTO';

@Component({
  selector: 'app-admin-view-bank',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-view-bank.component.html',
  styleUrls: ['./admin-view-bank.component.css']
})
export class AdminViewBankComponent implements OnInit {
  banks: Bank[] = [];
  selectedBank: Bank | null = null;
  bankDto: BankDTO = { bankName: '', ifsc: '' };
  loading = true;
  responseMessage: string | null = null;

  constructor(private bankService: BankService) {}

  ngOnInit(): void {
    this.fetchBanks();
  }

  fetchBanks() {
    this.loading = true;
    this.bankService.getAllBanks().subscribe({
      next: (res) => {
        this.banks = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.responseMessage = "Failed to fetch banks!";
      }
    });
  }

  editBank(bank: Bank) {
    this.selectedBank = bank;
    this.bankDto = { bankName: bank.bankName, ifsc: bank.ifsc };
  }

  updateBank() {
    if (!this.selectedBank) return;

    this.bankService.updateBank(this.selectedBank.bankId, this.bankDto).subscribe({
      next: () => {
        this.responseMessage = "Bank updated successfully!";
        this.selectedBank = null;
        this.fetchBanks();
      },
      error: () => this.responseMessage = "Failed to update bank!"
    });
  }

  deleteBank(id: number) {
    if (confirm("Are you sure you want to delete this bank?")) {
      this.bankService.deleteBank(id).subscribe({
        next: () => {
          this.responseMessage = "Bank deleted successfully!";
          this.fetchBanks();
        },
        error: () => this.responseMessage = "Failed to delete bank!"
      });
    }
  }
}