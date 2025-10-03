import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BankRegisterService } from '../../../Services/bankUser.service';
import { AuthService } from '../../../Services/auth.service';
import { ClientRegisterService } from '../../../Services/client.service';
import { PaymentService } from '../../../Services/payment.service';
import { BankUser } from '../../../Models/BankUser';
import { ClientUser } from '../../../Models/ClientUser';
import { Payment } from '../../../Models/Payment';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../Services/notification.service';

@Component({
  selector: 'app-bank-user-profile',
  imports:[CommonModule,RouterLink],
  templateUrl: './bank-user-profile.component.html',
  styleUrls: ['./bank-user-profile.component.css']
})
export class BankUserProfileComponent implements OnInit {
  bankUser!: BankUser;
  clients: ClientUser[] = [];
  payments: Payment[] = [];
  totalClients: number = 0;
  totalPayments: number = 0;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private bankUserSvc: BankRegisterService,
    private clientSvc: ClientRegisterService,
    private paymentSvc: PaymentService,
    private notify: NotificationService 
  ) {}

  ngOnInit(): void {
    // Get logged-in bank user
    const userId = this.auth.getUserId();
    if (userId) {
      this.fetchBankUser(userId);
    }
  }

  fetchBankUser(id: number) {
    this.bankUserSvc.getBankUser(id).subscribe({
      next: (data) => {
        this.bankUser = data;
        console.log('Bank User:', data);

        // Fetch clients and payments only after bank user is loaded
        this.fetchClients();
        this.fetchPayments();
      },
      error: (err) => {
        console.error('Error fetching bank user:', err);
      }
    });
  }

  fetchClients() {
    this.clientSvc.getClients('').subscribe({
      next: (data) => {
        // Filter clients belonging to this bank user
        this.clients = data.filter(c => c.bankUserId === this.bankUser?.userId);
        this.totalClients = this.clients.length;
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      }
    });
  }

  fetchPayments() {
    this.paymentSvc.getAllPayments('').subscribe({
      next: (data) => {
        // Filter payments for this bank user’s clients
        const clientIds = this.clients.map(c => c.userId);
        this.payments = data.filter(p => clientIds.includes(p.payerAccountId));
        this.totalPayments = this.payments.length;
      },
      error: (err) => {
        console.error('Error fetching payments:', err);
      }
    });
  }
}
