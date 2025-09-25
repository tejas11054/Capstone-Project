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
  getAllBankUsers(): Observable<BankUser[]> {
    return this.http.get<BankUser[]>(this.baseUrl);
  }

  // Get one bank user by id
  getBankUser(userId: number): Observable<BankUser> {
    return this.http.get<BankUser>(`${this.baseUrl}/${userId}`);
  }

   approveBankUser(userId: number, dto: any) {
  return this.http.put(`${this.baseUrl}/approve/${userId}`, dto);
}

  // Reject a bank user
  rejectBankUser(bankId: number, reason: string): Observable<string> {
    return this.http.put(`${this.baseUrl}/reject/${bankId}`, { reason }, { responseType: 'text' });
  }

  // Optional: register new bank user
  registerBankUser(user: RegisterBankUserDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }
}