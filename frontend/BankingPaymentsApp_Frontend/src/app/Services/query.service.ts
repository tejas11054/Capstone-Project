import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Query } from '../Models/Query';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private apiUrl = environment.backendURL + "/Query"; 

  constructor(private http: HttpClient) {}

  // Get all queries
  getAllQueries(): Observable<Query[]> {
    return this.http.get<Query[]>(this.apiUrl);
  }

  // Get a query by ID
  getQueryById(id: number): Observable<Query> {
    return this.http.get<Query>(`${this.apiUrl}/${id}`);
  }

  // Create a new query
  createQuery(query: Query): Observable<Query> {
    return this.http.post<Query>(this.apiUrl, query);
  }

}
