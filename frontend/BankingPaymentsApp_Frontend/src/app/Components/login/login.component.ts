import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponseDTO } from '../../DTO/LoginResponseDTO';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginResponse!: LoginResponseDTO;
  constructor(private fb: FormBuilder, private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [""],
      password: [""]
    })
  }

  Login(loginForm: any) {
    this.authSvc.loginUser(loginForm.value).subscribe(
      data => {
        // console.log(typeof (data));
        // console.log(data.isSuccess);
        // console.log(typeof (data));
        // console.log(data.token + "this the data we want")

        this.authSvc.saveToken(data);
      },

      error => {
        console.log(error);
        this.router.navigate(["/"]);
      },

      () => console.log("Login Conpleted!")
    );
  }
}
