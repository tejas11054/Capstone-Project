import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalaryDisbursementService {

  salaryDisbursement:string = environment.backendURL + "SalaryDisbursement/";
  constructor(private http:HttpClient) { }

  getAllSalaryDisbursement(){
    return this.http.get(this.salaryDisbursement);
  }

  approveSalaryDisbursement()
}
