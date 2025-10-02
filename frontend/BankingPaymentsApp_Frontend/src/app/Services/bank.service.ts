import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BankDTO } from '../DTO/BankDTO';
import { Observable } from 'rxjs';
import { Bank } from '../Models/Bank';
import { BankUsersPerBank } from '../DTO/BankUserPerBank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private baseUrl = environment.backendURL + "/Bank";

  constructor(private http: HttpClient) { }

  createBank(dto: BankDTO): Observable<Bank> {
    return this.http.post<Bank>(`${this.baseUrl}`, {
      ...dto,
      isActive: true
    });
  }

  getAllBanks(queryParams:string): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.baseUrl}?${queryParams}`);
  }

  getBankById(id: number): Observable<Bank> {
    return this.http.get<Bank>(`${this.baseUrl}/${id}`);
  }

  updateBank(id: number, dto: BankDTO): Observable<Bank> {
    return this.http.put<Bank>(`${this.baseUrl}/${id}`, dto);
  }

  deleteBank(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  userPerBank(): Observable<BankUsersPerBank[]> {
    return this.http.get<BankUsersPerBank[]>(this.baseUrl + "/users");
  }

}
