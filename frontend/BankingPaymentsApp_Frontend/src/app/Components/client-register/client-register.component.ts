import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
      UserPhone: ['', Validators.required],
      UserRoleId: [3, Validators.required], // default role
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Address: ['', Validators.required],
      AccountId: ['']
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('Password')?.value;
    const confirm = group.get('ConfirmPassword')?.value;
    return pass === confirm ? null : { notMatching: true };
  }

  register() {
    if (this.registerForm.invalid) return;

    const user: RegisterClientUserDTO = this.registerForm.value;

    this.clientService.registerClient(user).subscribe({
      next: (res) => {
        alert('Registration successful!');
        this.router.navigate(['/Login']);
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed!');
      }
    });
  }
}
