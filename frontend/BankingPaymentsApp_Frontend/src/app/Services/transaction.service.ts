import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  apiUrl = environment.backendURL + "/Transaction";

  constructor(private http: HttpClient) {}

  // Get transactions with optional filters
  getTransactions(
    transactionId?: number,
    transactionTypeId?: number,
    createdAt?: string  // ISO date string
  ): Observable<any[]> {
    let params = new HttpParams();

    if (transactionId) params = params.set('transactionId', transactionId);
    if (transactionTypeId) params = params.set('transactionTypeId', transactionTypeId);
    if (createdAt) params = params.set('date', createdAt); // match backend query param

    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
