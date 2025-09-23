import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterBankUserDTO } from '../DTO/RegisterBankUserDTO';

@Injectable({
  providedIn: 'root'
})
export class BankRegisterService {
  private apiUrl = 'https://localhost:7030/api/BankUser';

  constructor(private http: HttpClient) {}

  registerBankUser(user: RegisterBankUserDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}