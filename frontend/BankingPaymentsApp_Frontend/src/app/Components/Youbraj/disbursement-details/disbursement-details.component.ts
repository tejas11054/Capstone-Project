import { Component, OnInit } from '@angular/core';
import { SalaryDisbursement } from '../../../Models/SalaryDisbursement';
import { SalaryDisbursementService } from '../../../Services/salary-disbursement.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentStatusPipe } from '../../../Pipes/payment-status.pipe';

@Component({
  selector: 'app-disbursement-details',
  imports: [CommonModule, PaymentStatusPipe,RouterLink],
  templateUrl: './disbursement-details.component.html',
  styleUrl: './disbursement-details.component.css',
  standalone:true
})
export class DisbursementDetailsComponent implements OnInit {
  disbursement!: SalaryDisbursement;

  constructor(private route: ActivatedRoute, private disbursementSvc: SalaryDisbursementService) { }

  ngOnInit(): void {
    let disbursementId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchDisbursementById(disbursementId);
  }

  fetchDisbursementById(id: number) {
    this.disbursementSvc.getSalaryDisbursementById(id).subscribe((data) => {
      console.log(data);
      this.disbursement = data;
    },
      (error) => {
        console.log(error);
      })
  }
}
