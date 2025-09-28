import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateSalaryDisbursmentDTO } from '../DTO/CreateSalaryDisbursmentDTO';
import { Observable } from 'rxjs';
import { SalaryDisbursement } from '../Models/SalaryDisbursement';
import { RejectDTO } from '../DTO/RejectDTO';

@Injectable({
  providedIn: 'root'
})
export class SalaryDisbursementService {

  salaryDisbursementURL:string = environment.backendURL + "/SalaryDisbursement";
  constructor(private http:HttpClient) { }

  getAllSalaryDisbursement(queryParams: string):Observable<SalaryDisbursement[]>{
    return this.http.get<SalaryDisbursement[]>(this.salaryDisbursementURL+`?${queryParams}`);
  }

  getSalaryDisbursementById(id:number):Observable<SalaryDisbursement>{
    return this.http.get<SalaryDisbursement>(this.salaryDisbursementURL+`/${id}`);
  }

  createSalaryDisbursement(disbursement:CreateSalaryDisbursmentDTO):Observable<SalaryDisbursement>{
    return this.http.post<SalaryDisbursement>(this.salaryDisbursementURL,disbursement);
  }

  approveSalaryDisbursement(id:number){
    return this.http.put(this.salaryDisbursementURL + `/approve/${id}`,null);
  }

  rejectSalaryDisbursement(rejectResponse:RejectDTO){
    return this.http.put(this.salaryDisbursementURL + `/reject/${rejectResponse.id}`,rejectResponse);
  }
}
