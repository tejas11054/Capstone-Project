import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BankRegisterService } from '../../Services/bankUser.service';
import { RegisterBankUserDTO } from '../../DTO/RegisterBankUserDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bank-register.component.html',
  styleUrls: ['./bank-register.component.css']
})
export class BankRegisterComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bankService: BankRegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      UserFullName: ['', Validators.required],
      UserName: ['', Validators.required],
      UserEmail: ['', [Validators.required, Validators.email]],
      UserPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      UserRoleId: [2, Validators.required], // 2 => BankUser
      Password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      ConfirmPassword: ['', Validators.required],
      RefferalCode: ['', Validators.required],
      Branch: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('Password')?.value;
    const confirm = group.get('ConfirmPassword')?.value;
    return password === confirm ? null : { notMatching: true };
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;
    const user: RegisterBankUserDTO = {
      ...formValue,
      RefferalCode: formValue.RefferalCode || '',
      Branch: formValue.Branch
    };

    this.bankService.registerBankUser(user).subscribe({
      next: (res) => {
        alert('Bank User registered successfully!');
        this.router.navigate(['/Login']); // redirect to login page
      },
      error: (err) => {
        console.error('HTTP Error:', err);
        alert(err.error || 'Registration failed!');
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }
}