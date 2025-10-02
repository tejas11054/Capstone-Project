import { Component } from '@angular/core';
import { BankUser } from '../../Models/BankUser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BankRegisterService } from '../../Services/bankUser.service';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bankuser-edit',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './bankuser-edit.component.html',
  styleUrl: './bankuser-edit.component.css'
})
export class BankuserEditComponent {
  bankUserForm!: FormGroup;
  loading: boolean = true;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bankUserService: BankRegisterService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.auth.getUserId());

    this.bankUserForm = this.fb.group({
      userFullName: ['', Validators.required],
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      refferalCode: ['', Validators.required],
      branch: ['', Validators.required]
    });

    this.loadBankUser();
  }

  loadBankUser(): void {
    this.bankUserService.getBankUser(this.userId).subscribe({
      next: (user: BankUser) => {
        this.bankUserForm.patchValue(user);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bank user:', err);
        this.loading = false;
      }
    });
  }

  saveChanges(): void {
    if (this.bankUserForm.invalid) {
      this.bankUserForm.markAllAsTouched();
      return;
    }

    const updatedUser: BankUser = {
      ...this.bankUserForm.value,
      userId: this.userId
    };

    this.bankUserService.updateBankUser(this.userId, updatedUser).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/BankUserProfile']);
      },
      error: (err) => console.error('Error updating bank user:', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/bank-users']);
  }
}
