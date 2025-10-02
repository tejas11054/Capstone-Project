import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = environment.backendURL + "/log"; 

  constructor(private http: HttpClient) {}

  // Get all logs
  getLogs(pageNumber: number = 1, pageSize: number = 5): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

  // Download a log file
  downloadLog(fileName: string): Observable<Blob> {
    const url = `${this.apiUrl}/download/${fileName}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
