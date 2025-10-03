import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientRegisterService } from '../../Services/client.service';
import { ClientUser } from '../../Models/ClientUser';
import { Account } from '../../Models/Account';
import { AccType, AccountType } from '../../Models/AccountType';
import { AccStatus, AccountStatus } from '../../Models/AccountStatus';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-client-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.css']
})

export class ClientAccountComponent implements OnInit {
  userId!: number;
  userData!: ClientUser;
  account!: Account;
  loading = true;
  accountType!: AccountType;
  accountStatus!: AccountStatus;

  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private notify: NotificationService 
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    this.clientSvc.getClientById(this.userId).subscribe({
      next: (res: ClientUser) => {
        this.userData = res;
        if (res.account) {
          this.account = res.account;

          // Map accountTypeId and accountStatusId to enums
          this.accountType = {
            typeId: this.account.accountTypeId,
            type: this.mapAccountType(this.account.accountTypeId)
          };

          this.accountStatus = {
            statusId: this.account.accountStatusId,
            status: this.mapAccountStatus(this.account.accountStatusId)
          };
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching client account:", err);
        this.loading = false;
      }
    });
  }

  // Mapping functions
  mapAccountType(id: number): AccType {
    switch(id) {
      case 1: return AccType.SAVINGS;
      case 2: return AccType.CURRENT;
      case 3: return AccType.SALARY;
      default: return AccType.SAVINGS;
    }
  }

  mapAccountStatus(id: number): AccStatus {
    switch(id) {
      case 1: return AccStatus.ACTIVE;
      case 2: return AccStatus.INACTIVE;
      case 3: return AccStatus.CLOSED;
      default: return AccStatus.ACTIVE;
    }
  }
}