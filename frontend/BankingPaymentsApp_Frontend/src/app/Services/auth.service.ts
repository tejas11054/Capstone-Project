import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../DTO/LoginDTO';
import { LoginResponseDTO } from '../DTO/LoginResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = "https://localhost:7030/api/Auth/Login";

  constructor(private http: HttpClient) { }

  loginUser(user: LoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.loginURL, user);
  }
}