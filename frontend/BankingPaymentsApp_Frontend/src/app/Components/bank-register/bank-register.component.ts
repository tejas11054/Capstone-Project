import { Component, OnInit } from '@angular/core';
import { BankService } from '../../Services/bank.service';
import { Bank } from '../../Models/Bank';
import { BankDTO } from '../../DTO/BankDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-bank-register',
  standalone: true,
  imports: [
    CommonModule, FormsModule,RouterLink
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
    private router: Router,
    private notify: NotificationService 
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
        this.notify.success("Bank has been registered successfully");

        this.loading = false; // hide spinner
        this.router.navigate(['/banks']); 
      },
      error: () => {
        this.responseMessage = 'Failed to register bank!';
        this.loading = false;
      }
    });
  }
}