import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BeneficiaryService } from '../../Services/beneficiary.service';
import { AuthService } from '../../Services/auth.service';
import { Beneficiary } from '../../Models/Beneficiary';

@Component({
  selector: 'app-beneficiary-register',
  imports: [ReactiveFormsModule],
  templateUrl: './beneficiary-register.component.html',
  styleUrl: './beneficiary-register.component.css'
})
export class BeneficiaryRegisterComponent implements OnInit {

  createBeneficiary!: FormGroup;
  @Output() beneficiaryAdded = new EventEmitter<Beneficiary>();
  constructor(private fb: FormBuilder,private beneficiarySvc:BeneficiaryService,private auth:AuthService) { }


  ngOnInit(): void {
    this.createBeneficiary = this.fb.group({
      clientId: 0,
      beneficiaryName: "",
      accountNumber: "",
      bankName: "",
      ifsc: ""
    })

    const user = this.auth.getLoggedInUser();

    this.createBeneficiary.patchValue({clientId: user?.userId});

  }
  addBeneficiary() {
    this.beneficiarySvc.createBeneficiary(this.createBeneficiary.value).subscribe((data)=>{
      console.log(data);
      this.beneficiaryAdded.emit(data);
    },
  (error)=>{
    console.log(error);
  })
  }
}
