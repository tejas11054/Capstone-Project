import { Component, OnInit } from '@angular/core';
import { BankService } from '../../Services/bank.service';
import { Bank } from '../../Models/Bank';
import { BankDTO } from '../../DTO/BankDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-register',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './bank-register.component.html',
  styleUrls: ['./bank-register.component.css']
})
export class BankRegisterComponent implements OnInit {
  bankDto: BankDTO = {
    bankName: '',
    ifsc: ''
  };

  responseMessage: string | null = null;
  createdBank: Bank | null = null;
  loading = true;

  constructor(
    private bankService: BankService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // simulate loading finish
    this.loading = false;
  }

  onSubmit(): void {
    this.loading = true; // show spinner during request

    this.bankService.createBank(this.bankDto).subscribe({
      next: (res: Bank) => {
        this.responseMessage = 'Bank registered successfully!';
        this.createdBank = res;
        this.bankDto = { bankName: '', ifsc: '' }; 
        alert("Bank has been registered successfully");

        this.loading = false; // hide spinner
        this.router.navigate(['/login']); 
      },
      error: () => {
        this.responseMessage = 'Failed to register bank!';
        this.loading = false;
      }
    });
  }
}