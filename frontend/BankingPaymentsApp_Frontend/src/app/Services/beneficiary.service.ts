import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BeneficiaryDTO } from '../DTO/BeneficiaryDTO';
import { Observable } from 'rxjs';
import { Beneficiary } from '../Models/Beneficiary';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  BeneficiaryURL = environment.backendURL + "/Beneficiary";
  constructor(private http: HttpClient) { }

  getAllBeneficiaries(queryParams: string): Observable<Array<Beneficiary>> {
    return this.http.get<Array<Beneficiary>>(this.BeneficiaryURL + `?${queryParams}`);
  }

  getBeneficiaryById(id: number): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(this.BeneficiaryURL + `/${id}`);
  }

  createBeneficiary(beneficiary: BeneficiaryDTO): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(this.BeneficiaryURL, beneficiary);
  }

  updateBeneficiary(id: number, beneficiary: any): Observable<any> {
    return this.http.put(`${this.BeneficiaryURL}/${id}`, beneficiary);
  }

  deleteBeneficiary(id: number): Observable<any> {
    return this.http.delete(`${this.BeneficiaryURL}/${id}`, { responseType: 'text' as 'json' });
  }


}
