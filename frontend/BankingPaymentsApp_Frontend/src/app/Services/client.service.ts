import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { RegisterClientUserDTO } from '../DTO/RegisterClientUserDTO';
import { ClientUser } from '../Models/ClientUser';

@Injectable({
  providedIn: 'root'
})
export class ClientRegisterService {

  private baseUrl = 'https://localhost:7030/api';

  constructor(private http: HttpClient) { }

  registerClient(user: RegisterClientUserDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  getClients(): Observable<ClientUser[]> {
    return this.http.get<ClientUser[]>(`${this.baseUrl}/ClientUser`);
  }

  getClientById(clientId: number): Observable<ClientUser> {
    return this.http.get<ClientUser>(`${this.baseUrl}/ClientUser/${clientId}`);
  }

 approveClient(clientId: number): Observable<any> {
  return this.http.get<ClientUser>(`${this.baseUrl}/ClientUser/${clientId}`)
    .pipe(
      switchMap((fullClient: ClientUser) => 
        this.http.put(`${this.baseUrl}/ClientUser/approve/${clientId}`, fullClient)
      )
    );
}

 rejectClient(clientId: number, reason: string): Observable<string> {
  return this.http.put(`${this.baseUrl}/ClientUser/reject/${clientId}`, { reason }, { responseType: 'text' });
}


  getClientDocuments(clientId: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.baseUrl}/Document/client/${clientId}`);
  }
  
}