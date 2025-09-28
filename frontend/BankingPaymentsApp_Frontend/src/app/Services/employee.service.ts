import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../Models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.backendURL + "/Employee";

  constructor(private http: HttpClient) { }

  uploadEmployees(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}/upload`, formData, {
      responseType: 'text'
    });
  }

  getAllEmployees(queryParams: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + `?${queryParams}`);
  }

  getEmployeeById(id:number):Observable<Employee>{
    return this.http.get<Employee>(this.baseUrl + `/${id}`);
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }


  uploadCSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'text' });
  }

  uploadUpdateCSVByClient(file: File, clientId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/update-employee/${clientId}`, formData, { responseType: 'text' });
  }



}
