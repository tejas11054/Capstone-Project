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

  constructor(private bankService: BankRegisterService) {}

  ngOnInit(): void {
    this.fetchBankUsers();
  }

  fetchBankUsers() {
  this.banks = []; // reset
  this.bankService.getAllBankUsers().subscribe({
    next: (res: any[]) => {
      if (!res || res.length === 0) return;

      res.forEach((b: any) => {
        const userId = b.userId ?? b.id;
        this.bankService.getBankUser(userId).subscribe({
          next: (bankUser) => {
            this.banks.push({
              userId: bankUser.userId,
              userFullName: bankUser.userFullName,
              userName: bankUser.userName,
              password: bankUser.password || '',
              userEmail: bankUser.userEmail,
              userPhone: bankUser.userPhone,
              userRoleId: bankUser.userRoleId,
              userJoiningDate: bankUser.userJoiningDate,
              refferalCode: bankUser.refferalCode ?? bankUser.refferalCode,
              branch: bankUser.branch ?? bankUser.branch,
              isActive: !!bankUser.isActive,
              clientIds: bankUser.clientIds ?? bankUser.clientIds ?? [],
              bankId: bankUser.bankId ?? 0,
              bank: bankUser.bank,
            });
          },
          error: (err) => console.error('Failed to fetch user:', userId, err)
        });
      });
    },
    error: (err) => console.error('Error fetching bank users:', err)
  });
}


approveBankUser(bankUserId: number) {
  // Step 0: Ask for confirmation
  const bank = this.banks.find(b => b.userId === bankUserId);
  if (!bank) return;

  if (!confirm(`Do you really want to approve ${bank.userFullName || bank.userName}?`)) {
    return; // user clicked Cancel
  }

  this.processing[bankUserId] = true;

  // Step 1: Fetch full BankUser object
  this.bankService.getBankUser(bankUserId).subscribe({
    next: (bankUser) => {
      // Step 2: Send the full object to approve
      this.bankService.approveBankUser(bankUserId, bankUser).subscribe({
        next: (res) => {
          console.log('Approved!', res);
          this.fetchBankUsers(); // Refresh list
          this.processing[bankUserId] = false;
        },
        error: (err) => {
          console.error('Approval failed:', err);
          alert('Approval failed! Check console for details.');
          this.processing[bankUserId] = false;
        }
      });
    },
    error: (err) => {
      console.error('Failed to fetch BankUser:', err);
      alert('Failed to fetch BankUser before approval!');
      this.processing[bankUserId] = false;
    }
  });
}


  rejectBankUser(bank: BankUser) {
  const id = bank.userId;
  if (!id) return;

  // Ask the user for a reason
  const reason = prompt(`Enter the reason for rejecting ${bank.userFullName || bank.userName}:`);
  if (!reason || reason.trim() === '') {
    alert('Rejection reason is required!');
    return; // stop if no reason provided
  }

  // Confirm action
  if (!confirm(`Do you really want to reject ${bank.userFullName || bank.userName}?`)) {
    return;
  }

  this.processing[id] = true;

  this.bankService.rejectBankUser(id, reason).subscribe({
    next: (res) => {
      alert(res);
      this.fetchBankUsers(); // Refresh the list
      this.processing[id] = false;
    },
    error: (err) => {
      console.error('Error rejecting bank user:', err);
      alert('Failed to reject bank user. Check console.');
      this.processing[id] = false;
    }
  });
}

}