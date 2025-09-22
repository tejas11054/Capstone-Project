import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterClientUserDTO } from '../DTO/RegisterClientUserDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientRegisterService {

  private apiUrl = 'https://localhost:7030/api/Client'; 

  constructor(private http: HttpClient) { }

  registerClient(user: RegisterClientUserDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Register`, user);
  }
}
