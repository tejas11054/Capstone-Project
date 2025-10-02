import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientRegisterService } from '../../Services/client.service';
import { RegisterClientUserDTO } from '../../DTO/RegisterClientUserDTO';
import { Router } from '@angular/router';
import { BankService } from '../../Services/bank.service';
import { Bank } from '../../Models/Bank';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent {

  registerForm: FormGroup;
  banks!:Bank[];
  passwordFieldType: 'password' | 'text' = 'password'; // for eye toggle
  @Output() nextStep = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private clientService: ClientRegisterService,
    private router: Router,
    private bankSvc:BankService
  ) {
    this.registerForm = this.fb.group({
      UserFullName: ['', Validators.required],
      UserName: ['', Validators.required],
      UserEmail: ['', [Validators.required, Validators.email]],
      UserPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      UserRoleId: [3, Validators.required],
      Password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      ConfirmPassword: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Address: ['', Validators.required],
      BankId: ['', Validators.required],
      AccountId: ['']
    }, { validators: this.passwordMatchValidator });

    this.fetchBanks();
  }

  private passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('Password')?.value;
    const confirm = group.get('ConfirmPassword')?.value;
    return password === confirm ? null : { notMatching: true };
  }

  // toggle password visibility
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;
    const user: RegisterClientUserDTO = {
      ...formValue,
      DateOfBirth: formValue.DateOfBirth,
      AccountId: formValue.AccountId ? formValue.AccountId : null
    };

    this.clientService.registerClient(user).subscribe({
      next: (res) => {
        const clientId = res.userId; // make sure this matches API response
        if (!clientId) {
          console.error('ClientId missing in response!');
          return;
        }
        alert('Registration successful!');
        localStorage["userId"] = clientId;
        // this.router.navigate(['/DocumentUpload']);
        this.nextStep.emit();
      },
      error: (err) => {
        console.error('HTTP Error:', err);
        alert(err.error || 'Registration failed!');
      }
    });
  }

  fetchBanks(){
    this.bankSvc.getAllBanks("").subscribe((data)=>{
      console.log(data);
      this.banks = data;
    })
  }

  get f() {
    return this.registerForm.controls;
  }
}
