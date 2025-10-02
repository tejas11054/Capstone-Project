import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = environment.backendURL + "/User";
  constructor(private http:HttpClient) { }

  getUserById(id:number):Observable<User>{
    return this.http.get<User>(this.apiURL + `/${id}`);
  }
}
