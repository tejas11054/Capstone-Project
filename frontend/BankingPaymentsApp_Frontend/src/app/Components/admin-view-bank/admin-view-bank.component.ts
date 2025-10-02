import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankService } from '../../Services/bank.service';
import { Bank } from '../../Models/Bank';
import { BankDTO } from '../../DTO/BankDTO';
import { RouterLink } from '@angular/router';
import { NameFilterComponent } from '../Filters/name-filter/name-filter.component';
import { BooleanFilterComponent } from '../Filters/boolean-filter/boolean-filter.component';

@Component({
  selector: 'app-admin-view-bank',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NameFilterComponent, BooleanFilterComponent],
  templateUrl: './admin-view-bank.component.html',
  styleUrls: ['./admin-view-bank.component.css']
})
export class AdminViewBankComponent implements OnInit {
  banks: Bank[] = [];
  filters: any = {}
  selectedBank: Bank | null = null;
  bankDto: BankDTO = { bankName: '', ifsc: '' };
  loading = true;
  responseMessage: string | null = null;

  statusOptions = [
    { id: true, name: "Active" },
    { id: false, name: "InActive" }
  ];

  constructor(private bankService: BankService) { }

  ngOnInit(): void {
    const params = new URLSearchParams(this.filters).toString();
    this.fetchBanks(params);
  }

  fetchBanks(params: string) {
    this.loading = true;
    this.bankService.getAllBanks(params).subscribe({
      next: (res) => {
        console.log(res);
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
        const params = new URLSearchParams(this.filters).toString();
        this.fetchBanks(params);
      },
      error: () => this.responseMessage = "Failed to update bank!"
    });
  }

  deleteBank(id: number) {
    if (confirm("Are you sure you want to delete this bank?")) {
      this.bankService.deleteBank(id).subscribe({
        next: () => {
          this.responseMessage = "Bank deleted successfully!";
          const params = new URLSearchParams(this.filters).toString();
          this.fetchBanks(params);
        },
        error: () => this.responseMessage = "Failed to delete bank!"
      });
    }
  }

  onNameFilter(name: { payerName: string }) {
    this.filters.bankName = name.payerName;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchBanks(params);
  }

  onBooleanFilter(filter: { isActive: boolean | null }) {
    if (filter.isActive !== null) {
      this.filters.isActive = filter.isActive;
    } else {
      delete this.filters.isActive;
    }

    const params = new URLSearchParams(this.filters).toString();
    this.fetchBanks(params);
  }
}