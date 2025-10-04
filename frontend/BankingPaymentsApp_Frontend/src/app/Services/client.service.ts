import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { RegisterClientUserDTO } from '../DTO/RegisterClientUserDTO';
import { ClientUser } from '../Models/ClientUser';
import { User } from '../Models/User';
import { RejectDTO } from '../DTO/RejectDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientRegisterService {

  private baseUrl = 'https://localhost:7030/api';

  constructor(private http: HttpClient) { }

  registerClient(user: RegisterClientUserDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ClientUser`, user);
  }


  getClients(queryParams: string): Observable<ClientUser[]> {
    return this.http.get<ClientUser[]>(`${this.baseUrl}/ClientUser?${queryParams}`);
  }

  getClientById(clientId: number): Observable<ClientUser> {
    return this.http.get<ClientUser>(`${this.baseUrl}/ClientUser/${clientId}`);
  }

  updateClientUser(id: number, user: ClientUser): Observable<ClientUser> {
    return this.http.put<ClientUser>(`${this.baseUrl}/ClientUser/${id}`, user);
  }

  softDelete(id:number):Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ClientUser/${id}`,{ responseType: 'text' as 'json' });
  }


  approveClient(clientId: number): Observable<any> {
    return this.http.get<ClientUser>(`${this.baseUrl}/ClientUser/${clientId}`)
      .pipe(
        switchMap((fullClient: ClientUser) =>
          this.http.put(`${this.baseUrl}/ClientUser/approve/${clientId}`, fullClient)
        )
      );
  }

  rejectClient(reject: RejectDTO): Observable<string> {
    return this.http.put(`${this.baseUrl}/ClientUser/reject/${reject.id}`, reject, { responseType: 'text' });
  }



  getClientDocuments(clientId: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.baseUrl}/Document/client/${clientId}`);
  }

}