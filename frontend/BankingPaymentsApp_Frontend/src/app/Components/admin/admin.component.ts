import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankRegisterService } from '../../Services/bank.service';
import { BankUser } from '../../Models/BankUser';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  banks: BankUser[] = [];

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


 // src/app/Components/admin/admin.component.ts
approveBank(bank: BankUser) {
  if (!bank.userId) {
    alert('Missing user id.');
    return;
  }

  if (!confirm(`Approve ${bank.userFullName || bank.userName || 'this user'}?`)) return;

  this.bankService.approveBank(bank.userId).subscribe({
    next: () => {
      alert('Bank user approved successfully!');
      this.fetchBanks();
    },
    error: (err) => {
      console.error('Error approving bank user:', err);
      alert('Failed to approve bank user. Check console.');
    }
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