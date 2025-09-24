import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { BankUser } from '../Models/BankUser';
import { RegisterBankUserDTO } from '../DTO/RegisterBankUserDTO';

@Injectable({
  providedIn: 'root'
})
export class BankRegisterService {
  private baseUrl = 'https://localhost:7030/api/BankUser';

  constructor(private http: HttpClient) { }

  // Get all bank users
  getBanks(): Observable<BankUser[]> {
    return this.http.get<BankUser[]>(this.baseUrl);
  }

  approveBank(userId: number) {
  // API currently ignores body, so send empty object
  return this.http.put(`${this.baseUrl}/approve/${userId}`, {});
}






  // Reject a bank user
  rejectBank(bankId: number, reason: string): Observable<string> {
    return this.http.put(`${this.baseUrl}/reject/${bankId}`, { reason }, { responseType: 'text' });
  }

  // Optional: register new bank user
  registerBankUser(user: RegisterBankUserDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }
}