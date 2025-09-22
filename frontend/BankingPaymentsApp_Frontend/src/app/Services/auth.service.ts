import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Models/LoginDTO';
import { Observable } from 'rxjs';
import { LoginResponse } from '../Models/LoginResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginURL:string = "https://localhost:7030/api";
  constructor(private http:HttpClient) { }

  loginUser(user:Login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.loginURL + "/Auth/Login" , user);
  }

  
}
