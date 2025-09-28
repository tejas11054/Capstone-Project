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
  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Download a log file
  downloadLog(fileName: string): Observable<Blob> {
    const url = `${this.apiUrl}/download/${fileName}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
