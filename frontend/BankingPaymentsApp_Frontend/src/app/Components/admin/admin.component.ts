import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankRegisterService } from '../../Services/bank.service';
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
    this.fetchBanks();
  }

  fetchBanks() {
    this.bankService.getBanks().subscribe({
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
          clientIds: b.clientIds ?? b.ClientIds ?? []
        }));
      },
      error: err => console.error('Error fetching bank users:', err)
    });
  }


 approveBank(bank: BankUser) {
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

      this.bankService.approveBank(id, approveDto).subscribe({
        next: () => {
          alert('Bank user approved successfully!');
          this.fetchBanks();
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











  rejectBank(bank: BankUser, reason: string) {
    this.bankService.rejectBank(bank.userId, reason).subscribe({
      next: (res) => {
        alert(res); // backend response
        this.fetchBanks();
      },
      error: (err) => {
        console.error('Error rejecting bank user:', err);
        alert('Failed to reject bank user. Check console.');
      }
    });
  }
}