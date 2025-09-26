import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../DTO/LoginDTO';
import { LoginResponseDTO } from '../DTO/LoginResponseDTO';
import { User } from '../Models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginURL: string = environment.backendURL;
  constructor(private http: HttpClient) { }

  loginUser(user: LoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.loginURL + "/Auth/Login", user);
  }

  saveToken(response: LoginResponseDTO): void {
    try {

      if (!response) {
        throw new Error("Empty or invalid token");
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("userId", JSON.stringify(response.user.userId));

      const payloadBase64 = response.token.split('.')[1];

      // JWT uses base64url, so replace chars before decoding
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(atob(base64));

      localStorage.setItem("role", decodedPayload["Role"]);
    } catch (err) {
      console.error("Invalid token format", err);
    }
  }

  getLoggedInUser(): User | null {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  getUserRole(): string | null {
    const role = localStorage.getItem("role");
    if(role){
      return role;
    }
    return null;
  }

  isLoggedIn():boolean{
    const token = localStorage.getItem("token");
    if(token) return true;
    return false;
  }

  getToken():string | null{
    return localStorage.getItem("token");
  }

  getUserId(): number | null {
    const id = localStorage.getItem("userId");
    return id ? parseInt(id, 10) : null;
  }

  logout(){
    localStorage.clear();
  }

}
