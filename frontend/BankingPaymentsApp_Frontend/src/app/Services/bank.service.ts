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
}
