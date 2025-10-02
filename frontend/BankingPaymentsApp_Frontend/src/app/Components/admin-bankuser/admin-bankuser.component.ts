import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankRegisterService } from '../../Services/bankUser.service';
import { BankUser } from '../../Models/BankUser';
import { DateFilterComponent } from '../Filters/date-filter/date-filter.component';
import { AmountFilterComponent } from '../Filters/amount-filter/amount-filter.component';
import { AccountNumberFilterComponent } from '../Filters/account-number-filter/account-number-filter.component';
import { IdFilterComponent } from '../Filters/id-filter/id-filter.component';
import { NameFilterComponent } from '../Filters/name-filter/name-filter.component';
import { StatusFilterComponent } from '../Filters/status-filter/status-filter.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RejectDTO } from '../../DTO/RejectDTO';
import { RejectModalComponent } from '../Shared/reject-modal/reject-modal.component';
import { BankService } from '../../Services/bank.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RejectModalComponent, DateFilterComponent, AmountFilterComponent, AccountNumberFilterComponent, IdFilterComponent, NameFilterComponent, StatusFilterComponent],
  templateUrl: './admin-bankuser.component.html',
  styleUrls: ['./admin-bankuser.component.css']
})
export class AdminComponent implements OnInit {

  banks: BankUser[] = [];
  processing: Record<number, boolean> = {};
  filters: any = {}
  @ViewChild("rejectModal") formModal!: RejectModalComponent;
  selectedPayment: any = null;
  Banks!: any;
  totalBankUser!:number;
  pending!:number;
  approved!:number;

  statusOptions!: { id: number, name: string }[];

  constructor(private bankService: BankRegisterService, private bankSvc: BankService) { }

  ngOnInit(): void {
    const params = new URLSearchParams(this.filters).toString();
    this.fetchBankUsers(params);
    this.fetchBanks();
  }

  fetchBanks() {
    this.bankSvc.getAllBanks("").subscribe((data: any[]) => {
      console.log("Full Data:", data);

      // Extract only bankId & Bankname, rename keys to id & name
      const newArr = data.map(({ bankId, bankName }) => ({
        id: bankId,
        name: bankName
      }));

      console.log("Filtered Data:", newArr);

      this.statusOptions = newArr;
    });
  }

  // fetchBankUsers() {
  //   this.banks = []; // reset
  //   this.bankService.getAllBankUsers().subscribe({
  //     next: (res: any[]) => {
  //       if (!res || res.length === 0) return;

  //       res.forEach((b: any) => {
  //         const userId = b.userId ?? b.id;
  //         this.bankService.getBankUser(userId).subscribe({
  //           next: (bankUser) => {
  //             this.banks.push({
  //               userId: bankUser.userId,
  //               userFullName: bankUser.userFullName,
  //               userName: bankUser.userName,
  //               password: bankUser.password || '',
  //               userEmail: bankUser.userEmail,
  //               userPhone: bankUser.userPhone,
  //               userRoleId: bankUser.userRoleId,
  //               userJoiningDate: bankUser.userJoiningDate,
  //               refferalCode: bankUser.refferalCode ?? bankUser.refferalCode,
  //               branch: bankUser.branch ?? bankUser.branch,
  //               isActive: !!bankUser.isActive,
  //               clientIds: bankUser.clientIds ?? bankUser.clientIds ?? [],
  //               bankId: bankUser.bankId ?? 0,
  //               bank: bankUser.bank,
  //             });
  //           },
  //           error: (err) => console.error('Failed to fetch user:', userId, err)
  //         });
  //       });
  //     },
  //     error: (err) => console.error('Error fetching bank users:', err)
  //   });
  // }

  fetchBankUsers(params: string) {
    this.bankService.getAllBankUsers(params).subscribe((data) => {
      console.log(data);
      this.banks = data;
      this.totalBankUser = data.length;
      this.pending = data.filter(b=>b.isActive==false).length;
      this.approved = data.filter(b=>b.isActive==true).length;
    },
      (error) => {
        console.log(error);
      })
  }
  // approveBankUser(bankUserId: number) {
  //   // Step 0: Ask for confirmation
  //   const bank = this.banks.find(b => b.userId === bankUserId);
  //   if (!bank) return;

  //   if (!confirm(`Do you really want to approve ${bank.userFullName || bank.userName}?`)) {
  //     return; // user clicked Cancel
  //   }

  //   this.processing[bankUserId] = true;

  //   // Step 1: Fetch full BankUser object
  //   this.bankService.getBankUser(bankUserId).subscribe({
  //     next: (bankUser) => {
  //       // Step 2: Send the full object to approve
  //       this.bankService.approveBankUser(bankUserId, bankUser).subscribe({
  //         next: (res) => {
  //           console.log('Approved!', res);
  //           this.fetchBankUsers(params); // Refresh list
  //           this.processing[bankUserId] = false;
  //         },
  //         error: (err) => {
  //           console.error('Approval failed:', err);
  //           alert('Approval failed! Check console for details.');
  //           this.processing[bankUserId] = false;
  //         }
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch BankUser:', err);
  //       alert('Failed to fetch BankUser before approval!');
  //       this.processing[bankUserId] = false;
  //     }
  //   });
  // }


  // rejectBankUser(bank: BankUser) {
  //   const id = bank.userId;
  //   if (!id) return;

  //   // Ask the user for a reason
  //   const reason = prompt(`Enter the reason for rejecting ${bank.userFullName || bank.userName}:`);
  //   if (!reason || reason.trim() === '') {
  //     alert('Rejection reason is required!');
  //     return; // stop if no reason provided
  //   }

  //   // Confirm action
  //   if (!confirm(`Do you really want to reject ${bank.userFullName || bank.userName}?`)) {
  //     return;
  //   }

  //   this.processing[id] = true;

  //   this.bankService.rejectBankUser(id, reason).subscribe({
  //     next: (res) => {
  //       alert(res);
  //       this.fetchBankUsers(params); // Refresh the list
  //       this.processing[id] = false;
  //     },
  //     error: (err) => {
  //       console.error('Error rejecting bank user:', err);
  //       alert('Failed to reject bank user. Check console.');
  //       this.processing[id] = false;
  //     }
  //   });
  // }

  approveBankUser(bankUser: BankUser) {
    console.log(bankUser);
    this.bankService.approveBankUser(bankUser.userId, bankUser).subscribe((data) => {
      console.log(data);
      alert("bankUser sucessfully approved");
    },
      (error) => {
        console.log(error);
      })
  }

  openFormModal(payment: BankUser) {
    this.selectedPayment = {
      id: payment.userId
    };
    this.formModal.open(payment.userId);
  }

  handleFormSubmit(rejectForm: any) {
    console.log("data in parent=> " + rejectForm)
    this.rejectBankUser(rejectForm);
  }


  rejectBankUser(reject: RejectDTO) {
    this.bankService.rejectBankUser(reject).subscribe((data) => {
      console.log(data);
      alert("payment sucessfully Rejected");
    },
      (error) => {
        console.log(error);
      })
  }

  onDateFilter(dates: { dateFrom: string; dateTo: string }) {

    this.filters.joiningFrom = dates.dateFrom;
    this.filters.joiningTo = dates.dateTo;
    console.log(this.filters);

    const params = new URLSearchParams(this.filters).toString();
    this.fetchBankUsers(params);
  }


  onAccountFilter(account: { payeeAccountNumber: string | null }) {
    // this.filters.payeeAccountNumber = account.payeeAccountNumber;
    console.log(this.filters);
    if (account.payeeAccountNumber !== null) {
      this.filters.payeeAccountNumber = account.payeeAccountNumber;
    } else {
      delete this.filters.payeeAccountNumber; // ✅ remove old value
    }

    const params = new URLSearchParams(this.filters).toString();
    this.fetchBankUsers(params);
  }

  fetchById(value: { id: number }) {
    if (value.id == 0) {
      const params = new URLSearchParams(this.filters).toString();
      this.fetchBankUsers(params);
    }

    this.bankService.getBankUser(value.id).subscribe((data) => {
      console.log(data);
      this.banks = [data];
    },
      (error) => {
        console.log(error);
        this.banks = []
      })
  }

  onNameFilter(name: { payerName: string }) {
    this.filters.fullName = name.payerName;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchBankUsers(params);
  }

  onStatusFilter(status: { paymentStatusId: string }) {
    this.filters.bankId = status.paymentStatusId;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchBankUsers(params);
  }


  downloadPDF(): void {
    if (!this.banks || this.banks.length === 0) {
      alert('No bank Users to export!');
      return;
    }

    const doc = new jsPDF();
    doc.text('BankUsers Report', 14, 16);

    const tableColumn = ['#','userId', 'Full Name', 'User Name', 'bank', 'isActive', 'branch', 'joiningdate'];
    const tableRows: any[] = [];

    this.banks.forEach((t, i) => {
      tableRows.push([
        i + 1,
        t.userId,
        t.userFullName,
        t.userEmail,
        t.bank.bankName,
        t.isActive,
        t.branch,
        new Date(t.userJoiningDate).toLocaleString()
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save(`Payments_User_${this.banks[0].userId}.pdf`);
  }
}