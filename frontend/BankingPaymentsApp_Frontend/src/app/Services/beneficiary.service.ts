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
  constructor(private http:HttpClient) { }

  createBeneficiary(beneficiary: BeneficiaryDTO):Observable<Beneficiary>{
    return this.http.post<Beneficiary>(this.BeneficiaryURL,beneficiary);
  }
}
