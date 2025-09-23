import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponseDTO } from '../../DTO/LoginResponseDTO';
import { InvisibleReCaptchaComponent, NgxCaptchaModule, ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule,NgxCaptchaModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginResponse!: LoginResponseDTO;

  siteKey:string = environment.recaptcha.siteKey;

  @ViewChild('captchaElem') captchaElem!: InvisibleReCaptchaComponent;
  constructor(private fb: FormBuilder, private router: Router, private authSvc: AuthService,private reCaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [""],
      password: [""]
    })
  }

  handleSuccess(token: string) {
    console.log("Captcha success:", token);
    // Send login + token to backend
    this.authSvc.loginUser({
      ...this.loginForm.value,
      recaptchaToken: token
    }).subscribe(
      data => {
        this.authSvc.saveToken(data);
        this.router.navigate(["/dashboard"]);
      },
      error => {
        console.log(error);
      }
    );
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
    if (loginForm.valid) {
      // trigger invisible captcha check before login
      this.captchaElem.execute();
    }
  }
}
