import { Component, OnInit } from '@angular/core';
import { SalaryDisbursementService } from '../../Services/salary-disbursement.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateSalaryDisbursmentDTO } from '../../DTO/CreateSalaryDisbursmentDTO';
import { AuthService } from '../../Services/auth.service';
import { ListAllEmployeesComponent } from '../list-all-employees/list-all-employees.component';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-salary-disbursement',
  imports: [ReactiveFormsModule, ListAllEmployeesComponent],
  templateUrl: './salary-disbursement.component.html',
  styleUrl: './salary-disbursement.component.css'
})
export class SalaryDisbursementComponent implements OnInit {

  salaryDisbursementForm!: FormGroup;
  constructor(private auth: AuthService, private notify: NotificationService , private salaryDisbursementSvc: SalaryDisbursementService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.salaryDisbursementForm = this.fb.group({
      clientId: 0,
      allEmployees: true,
      employeeIds: []
    });
    const user = this.auth.getLoggedInUser();
    this.salaryDisbursementForm.patchValue({ clientId: user?.userId });
  }

  handleEvent(payload: any) {
    console.log(payload);
    if(payload.allEmployees){
      this.salaryDisbursementForm.patchValue({ allEmployees: payload?.allEmployees,employeeIds: []})  
    }
    else{
      this.salaryDisbursementForm.patchValue({ allEmployees: payload?.allEmployees, employeeIds: payload?.employeeIds })
    }
  }

  CreateSalaryDisbursement() {
    console.log(this.salaryDisbursementForm.value)
    this.salaryDisbursementSvc.createSalaryDisbursement(this.salaryDisbursementForm.value).subscribe((data) => {
      console.log(data);
      this.notify.success("Salary distribution created!")
    },
      (error) => {
        console.log(error);
      })
  }
}
