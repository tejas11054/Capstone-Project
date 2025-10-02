import { Component, OnInit } from '@angular/core';
import { ClientUser } from '../../../Models/ClientUser';
import { ClientUserResponseDTO } from '../../../DTO/ClientUserResponseDTO';
import { ClientRegisterService } from '../../../Services/client.service';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../Services/account.service';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
declare var bootstrap: any; 


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterLink, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, AfterViewInit  {
  @ViewChild('addBalanceModal') addBalanceModalRef!: ElementRef;
  addBalanceModal: any;
  client!: ClientUser;
  balanceForm: FormGroup;
  

  constructor(private auth: AuthService, private clientSvc: ClientRegisterService,  private fb: FormBuilder,
    private accountService: AccountService,) 
  {
    this.balanceForm = this.fb.group({
      balance: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const id = this.auth.getUserId() ?? 0;
    this.fetchClient(id);
  }

  ngAfterViewInit(): void {
  if (this.addBalanceModalRef) {
    this.addBalanceModal = new bootstrap.Modal(this.addBalanceModalRef.nativeElement);
  }
}


  fetchClient(id: number) {
    this.clientSvc.getClientById(id).subscribe((data) => {
      console.log(data);
      this.client = data;
    },
      (error) => {
        console.log(error);
      })
  }
  onEdit(){

  }

  onUpload(){

  }

   get isAddBalanceDisabled(): boolean {
    return (this.client?.account?.balance ?? 0) > 0;
  }
  
  openAddBalanceModal() {
  this.balanceForm.reset({ balance: 0 });
  this.addBalanceModal?.show();
}


  submitBalance() {
  if (this.balanceForm.invalid || !this.client?.account) return;

  const amountToAdd = this.balanceForm.value.balance;
  const updatedBalance = (this.client.account.balance ?? 0) + amountToAdd;

  const payload = {
    ...this.client.account,
    balance: updatedBalance
  };

  this.accountService.updateAccount(this.client.account.accountId, payload)
    .subscribe({
      next: (res: any) => {
        if (this.client?.account) {
          this.client.account.balance = res.balance;
        }
        this.addBalanceModal?.hide();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update balance.');
      }
    });
}

  
}
