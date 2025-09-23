import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientRegisterService } from '../../Services/client-register.service';
import { RegisterClientUserDTO } from '../../DTO/RegisterClientUserDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientRegisterService,
    private router: Router
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
      AccountId: ['']
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
  const user: RegisterClientUserDTO = {
    ...formValue,
    DateOfBirth: formValue.DateOfBirth,
    AccountId: formValue.AccountId ? formValue.AccountId : null
  };

 this.clientService.registerClient(user).subscribe({
  next: (res) => {
    const clientId = res.userId; // <-- correct field
    if (!clientId) {
      console.error('ClientId missing in response!');
      return;
    }
    alert('Registration successful!');
this.router.navigate(['/DocumentUpload', clientId]);

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