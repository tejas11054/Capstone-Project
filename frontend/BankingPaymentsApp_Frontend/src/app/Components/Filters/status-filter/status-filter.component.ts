import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentStatusPipe } from '../../../Pipes/payment-status.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-filter',
  imports: [FormsModule,ReactiveFormsModule, NgbDropdownModule, NgbDatepickerModule,CommonModule],
  templateUrl: './status-filter.component.html',
  styleUrl: './status-filter.component.css',
  standalone:true
})
export class StatusFilterComponent {
  filterForm!: FormGroup;

  @Input() title:string = "Status";
  @Input() statusOptions: { id: number; name: string }[] = [];
  @Output() statusFilter = new EventEmitter<{ paymentStatusId: string }>()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      paymentStatusId: ""
    });
  }

  applyFilters() {
    const value = this.filterForm.value;
    console.log(value)
    this.statusFilter.emit(value);
  }

  reset() {
    this.filterForm.reset();
    this.statusFilter.emit({ paymentStatusId: ""})
  }
}
