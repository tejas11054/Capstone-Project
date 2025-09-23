import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterClientUserDTO } from '../DTO/RegisterClientUserDTO';
import { ClientUser } from '../Models/ClientUser';

@Injectable({
  providedIn: 'root'
})
export class ClientRegisterService {

  private apiUrl = 'https://localhost:7030/api/ClientUser';

  constructor(private http: HttpClient) { }

  registerClient(user: RegisterClientUserDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  getClientUserById(id:number):Observable<ClientUser>{
    return this.http.get<ClientUser>(this.apiUrl + `/${id}`);
  }
}