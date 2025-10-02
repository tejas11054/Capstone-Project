import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { BankUser } from '../Models/BankUser';
import { RegisterBankUserDTO } from '../DTO/RegisterBankUserDTO';
import { Bank } from '../Models/Bank';
import { RejectDTO } from '../DTO/RejectDTO';

@Injectable({
  providedIn: 'root'
})
export class BankRegisterService {
  private baseUrl = 'https://localhost:7030/api/BankUser';

  constructor(private http: HttpClient) { }

  // Get all bank users
  getAllBankUsers(queryParams: string): Observable<BankUser[]> {
    return this.http.get<BankUser[]>(this.baseUrl + `?${queryParams}`);
  }

  // Get one bank user by id
  getBankUser(userId: number): Observable<BankUser> {
    return this.http.get<BankUser>(`${this.baseUrl}/${userId}`);
  }

  approveBankUser(userId: number, bankUser: BankUser) {
    return this.http.put(`${this.baseUrl}/approve/${userId}`, bankUser);
  }


  // Reject a bank user
  rejectBankUser(reject: RejectDTO): Observable<string> {
    return this.http.put(`${this.baseUrl}/reject/${reject.id}`, { reject }, { responseType: 'text' });
  }

  // Optional: register new bank user
  registerBankUser(user: RegisterBankUserDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.baseUrl}`);
  }
}