import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Observable } from 'rxjs';
import { RegisterBankUserDTO } from '../DTO/RegisterBankUserDTO';
=======
import { Observable, switchMap } from 'rxjs';
import { RegisterBankUserDTO } from '../DTO/RegisterBankUserDTO';
import { BankUser } from '../Models/BankUser';
>>>>>>> 4fadae7d565a50daace83d2352701161a1b02f94

@Injectable({
  providedIn: 'root'
})
export class BankRegisterService {
<<<<<<< HEAD
  private apiUrl = 'https://localhost:7030/api/BankUser';

  constructor(private http: HttpClient) {}

  registerBankUser(user: RegisterBankUserDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
=======
  private baseUrl = 'https://localhost:7030/api/BankUser';

  constructor(private http: HttpClient) { }
  
    registerBankUser(user: BankRegisterService): Observable<any> {
      return this.http.post<any>(this.baseUrl, user);
    }
  
    getClients(): Observable<BankUser[]> {
      return this.http.get<BankUser[]>(`${this.baseUrl}/BankUser`);
    }
  
    getBankById(bankId: number): Observable<BankUser> {
      return this.http.get<BankUser>(`${this.baseUrl}/BankUser/${bankId}`);
    }
  
   approveBank(bankId: number): Observable<any> {
    return this.http.get<BankUser>(`${this.baseUrl}/BankUser/${bankId}`)
      .pipe(
        switchMap((fullClient: BankUser) => 
          this.http.put(`${this.baseUrl}/BankUser/approve/${bankId}`, fullClient)
        )
      );
  }
  
   rejectBank(bankId: number, reason: string): Observable<string> {
    return this.http.put(`${this.baseUrl}/BankUser/reject/${bankId}`, { reason }, { responseType: 'text' });
>>>>>>> 4fadae7d565a50daace83d2352701161a1b02f94
  }
}