import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankRegisterService } from '../../Services/bankUser.service';
import { BankUser } from '../../Models/BankUser';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  banks: BankUser[] = [];
  processing: Record<number, boolean> = {}; 

  constructor(private bankService: BankRegisterService) {}

  ngOnInit(): void {
    this.fetchBankUsers();
  }

  fetchBankUsers() {
    this.bankService.getAllBankUsers().subscribe({
      next: (res: any[]) => {
        this.banks = res.map((b: any): BankUser => ({
          userId: b.userId ?? b.id,
          userFullName: b.userFullName,
          userName: b.userName,
          password: b.password || '', // don’t expose password
          userEmail: b.userEmail,
          userPhone: b.userPhone,
          userRoleId: b.userRoleId,
          userJoiningDate: b.userJoiningDate,
          refferalCode: b.refferalCode ?? b.RefferalCode,
          branch: b.branch ?? b.Branch,
          kycVierified: b.kycVierified ?? b.KycVierified,
          clientIds: b.clientIds ?? b.ClientIds ?? [],
          bankId: b.bankId ?? 0,  // <-- add default or actual value
          bank: b.bank ?? '' 
        }));
      },
      error: err => console.error('Error fetching bank users:', err)
    });
  }


 approveBankUser(bank: BankUser) {
  const id = bank.userId;
  if (!id) return;

  if (!confirm(`Approve ${bank.userFullName || bank.userName}?`)) return;

  this.bankService.getBankUser(id).subscribe({
    next: (fullBankUser) => {
      // Build only the fields backend expects
      const approveDto = {
        userId: fullBankUser.userId,
        userName: fullBankUser.userName,
        password: fullBankUser.password, // if required
        userRoleId: fullBankUser.userRoleId,
        userEmail: fullBankUser.userEmail,
        userPhone: fullBankUser.userPhone,
        branch: fullBankUser.branch,
        kycVierified: true // mark approved
      };

      this.bankService.approveBankUser(id, approveDto).subscribe({
        next: () => {
          alert('Bank user approved successfully!');
          this.fetchBankUsers();
        },
        error: (err) => {
          console.error('Approval failed:', err);
          alert('Approval failed. See console.');
        }
      });
    },
    error: (err) => console.error('Error fetching user before approval:', err)
  });
}


  rejectBankUser(bank: BankUser, reason: string) {
    this.bankService.rejectBankUser(bank.userId, reason).subscribe({
      next: (res) => {
        alert(res); // backend response
        this.fetchBankUsers();
      },
      error: (err) => {
        console.error('Error rejecting bank user:', err);
        alert('Failed to reject bank user. Check console.');
      }
    });
  }
}