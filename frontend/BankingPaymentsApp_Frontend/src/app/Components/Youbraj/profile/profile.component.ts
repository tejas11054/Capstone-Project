import { Component, OnInit } from '@angular/core';
import { ClientUser } from '../../../Models/ClientUser';
import { ClientUserResponseDTO } from '../../../DTO/ClientUserResponseDTO';
import { ClientRegisterService } from '../../../Services/client.service';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../Services/account.service';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CheckoutComponent } from '../../checkout/checkout.component';
import { NotificationService } from '../../../Services/notification.service';
import { DocumentPipe } from '../../../Pipes/document.pipe';
declare var bootstrap: any;


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, CheckoutComponent,DocumentPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('addBalanceModal') addBalanceModalRef!: ElementRef;
  addBalanceModal: any;
  client!: ClientUser;
  balanceForm: FormGroup;


  constructor(private auth: AuthService, private notify: NotificationService, private clientSvc: ClientRegisterService, private fb: FormBuilder,
    private accountService: AccountService, private router: Router) {
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
  onEdit() {

  }

  onUpload() {

  }

  get isAddBalanceDisabled(): boolean {
    return (this.client?.account?.balance ?? 0) > 0;
  }

  openAddBalanceModal() {
    this.balanceForm.reset({ balance: 0 });
    this.addBalanceModal?.show();
    // this.addBalanceModal.openModal();
  }

  deleteClient(id: number | undefined) {
    this.clientSvc.softDelete(Number(id)).subscribe((data) => {
      console.log(data);
      alert("User Sucessfully Deleted!");
      this.router.navigate(["Landing"])
    },
      (error) => {
        console.log(error);
      })
  }


  submitBalance() {
    if (this.balanceForm.invalid || !this.client?.account) return;

    const amountToAdd = this.balanceForm.value.balance;
    const updatedBalance = (this.client.account.balance ?? 0) + amountToAdd;

    const payload = {
      ...this.client.account,
      balance: updatedBalance
    };

    this.accountService.addBalance(this.client.account.accountId, amountToAdd)
      .subscribe({
        next: (res) => {
          if (this.client?.account) {
            this.client.account.balance += res.amount;
          }
          this.addBalanceModal?.hide();
        },
        error: (err) => {
          console.error(err);
          this.notify.error('Failed to update balance.');
        }
      });
  }


}
