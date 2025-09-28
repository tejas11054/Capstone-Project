import { Component, OnInit, ViewChild } from '@angular/core';
import { SalaryDisbursementService } from '../../Services/salary-disbursement.service';
import { SalaryDisbursement } from '../../Models/SalaryDisbursement';
import { RejectModalComponent } from '../Shared/reject-modal/reject-modal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentStatusPipe } from '../../Pipes/payment-status.pipe';
import { RejectDTO } from '../../DTO/RejectDTO';

@Component({
  selector: 'app-list-salary-disbursement',
  imports: [ReactiveFormsModule, CommonModule, RejectModalComponent, PaymentStatusPipe],
  templateUrl: './list-salary-disbursement.component.html',
  styleUrls: ['./list-salary-disbursement.component.css'],
  standalone: true
})
export class ListSalaryDisbursementComponent implements OnInit {

  salaryDisbursement!: SalaryDisbursement[];
  @ViewChild("rejectModal") formModal!: RejectModalComponent;
  selectedDisbursement: any = null;

  constructor(private fb: FormBuilder, private salaryDisbursementSvc: SalaryDisbursementService) { }


  ngOnInit(): void {
    // this.salaryDisbursementSvc.getAllSalaryDisbursement().subscribe((data) => {
    //   console.log(data);
    //   this.salaryDisbursement = data;
    // })
  }

  openFormModal(disbursement: SalaryDisbursement) {
    this.selectedDisbursement = {
      id: disbursement.salaryDisbursementId
    };
    this.formModal.open(disbursement.salaryDisbursementId);
  }

  handleFormSubmit(rejectForm: any) {
    console.log("data in parent=> " + rejectForm)
    this.rejectDisbursement(rejectForm);
  }

  rejectDisbursement(rejectForm: RejectDTO) {
    this.salaryDisbursementSvc.rejectSalaryDisbursement(rejectForm).subscribe((data) => {
      console.log(data);
      alert("this batch is now rejected!");
    },
      (error) => {
        console.log(error);
      })
  }

  approveDisbursement(id: number) {
    this.salaryDisbursementSvc.approveSalaryDisbursement(id).subscribe((data) => {
      console.log(data);
      alert("this batch is now approved!")
    },
      (error) => {
        console.log(error);
      })
  }


}
