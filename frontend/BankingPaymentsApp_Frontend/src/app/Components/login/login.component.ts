import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginResponseDTO } from '../../DTO/LoginResponseDTO';
import { Router } from '@angular/router';

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
        console.log(typeof (data));
        console.log(data.IsSuccess);
        console.log(typeof (data));
        console.log(data.Token + "this the data we want")

        // this.authSvc.saveToken(data);
      },

      error => {
        console.log(error);
        this.router.navigate(["/"]);
      },

      () => console.log("Login Conpleted!")
    );
  }
}
