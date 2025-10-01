import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BankDTO } from '../DTO/BankDTO';
import { Observable } from 'rxjs';
import { Bank } from '../Models/Bank';

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

   getAllBanks(pageNumber: number = 1, pageSize: number = 5): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
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
  
}
