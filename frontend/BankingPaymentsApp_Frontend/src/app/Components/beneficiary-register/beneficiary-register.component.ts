import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BeneficiaryService } from '../../Services/beneficiary.service';
import { AuthService } from '../../Services/auth.service';
import { Beneficiary } from '../../Models/Beneficiary';
import { Router } from '@angular/router';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-beneficiary-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './beneficiary-register.component.html',
  styleUrl: './beneficiary-register.component.css'
})
export class BeneficiaryRegisterComponent implements OnInit {

  @Input() userId!: number;
  createBeneficiary!: FormGroup;
  @Output() beneficiaryAdded = new EventEmitter<Beneficiary>();
  @Output() cancelAdd = new EventEmitter<void>(); 
  
  constructor(private router: Router,private fb: FormBuilder,private notify: NotificationService ,private beneficiarySvc:BeneficiaryService,private auth:AuthService) { }


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
    this.beneficiarySvc.createBeneficiary(this.createBeneficiary.value).subscribe(
      (data) => {
        console.log(data);
        this.notify.success(`The beneficiary ${data.beneficiaryName} has been added sucessfully!` )

        this.beneficiaryAdded.emit(data);
        this.cancelAdd.emit(); // close the form after successful addition
        this.router.navigate(["/beneficiary"])
      },
      (error) => {
        console.log(error);
        this.notify.error('Failed to add beneficiary.');
      }
    );
  }

  cancel() {
    this.cancelAdd.emit(); // notify parent to hide the form
  }
}
