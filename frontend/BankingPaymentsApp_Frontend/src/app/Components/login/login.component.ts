import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponseDTO } from '../../DTO/LoginResponseDTO';
import { InvisibleReCaptchaComponent, NgxCaptchaModule, ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule, NgxCaptchaModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginResponse!: LoginResponseDTO;
  passwordFieldType: string = 'password';

  siteKey: string = environment.recaptcha.siteKey;

  @ViewChild('captchaElem') captchaElem!: InvisibleReCaptchaComponent;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authSvc: AuthService,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  handleSuccess(token: string) {
    console.log("Captcha success:", token);

    // Send login + token to backend
    this.authSvc.loginUser({
      ...this.loginForm.value,
      recaptchaToken: token
    }).subscribe({
      next: data => {
        this.authSvc.saveToken(data);

        // Get role and userId from saved token
        const role = this.authSvc.getUserRole();
        const userId = this.authSvc.getUserId();

        // Role-based navigation
        switch (role) {
          case "ADMIN":
            this.router.navigate(['/Admin']);
            break;
          case "BANK_USER":
            this.router.navigate(['/BankUser']);
            break;
          case "CLIENT_USER":
            this.router.navigate(['/ClientUser', userId]); 
            break;
          default:
            alert("Unknown role! Cannot navigate.");
            break;
        }
      },
      error: err => {
        console.error("Login failed:", err);
        alert("Login failed. Check credentials or try again.");
      }
    });
  }

  handleReset() {
    console.log("Captcha reset");
  }

  handleLoad() {
    console.log("Captcha loaded");
  }

  handleReady() {
    console.log("Captcha ready");
  }

  Login(loginForm: FormGroup) {
    if (this.loginForm.valid) {
      // trigger invisible captcha check before login
      this.captchaElem.execute();
    } else {
      alert("Please enter username and password");
    }
  }


  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}