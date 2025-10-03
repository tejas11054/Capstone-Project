import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transaction } from '../Models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.backendURL + "/Account";

  constructor(private http: HttpClient) { }

  updateAccount(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  addBalance(id: number, amount: number): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/addBalance/${id}`, amount);
  }
}
