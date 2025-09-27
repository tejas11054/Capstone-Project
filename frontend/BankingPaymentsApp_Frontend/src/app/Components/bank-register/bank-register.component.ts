import { Component } from '@angular/core';
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
export class BankRegisterComponent {
  bankDto: BankDTO = {
    bankName: '',
    ifsc: ''
  };

  responseMessage: string | null = null;
  createdBank: Bank | null = null;

  constructor(
    private bankService: BankService, 
    private router: Router
  ) {}

  onSubmit(): void {
    this.bankService.createBank(this.bankDto).subscribe({
      next: (res: Bank) => {
        this.responseMessage = 'Bank registered successfully!';
        this.createdBank = res;
        this.bankDto = { bankName: '', ifsc: '' }; 
        alert("Bank has been registerd seccuessfully");

        this.router.navigate(['/login']); 
      },
      error: () => {
        this.responseMessage = 'Failed to register bank!';
      }
    });
  }
}
