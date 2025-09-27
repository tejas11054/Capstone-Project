import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-amount-filter',
  imports: [ReactiveFormsModule, NgbDropdownModule, NgbDatepickerModule, CommonModule],
  templateUrl: './amount-filter.component.html',
  styleUrl: './amount-filter.component.css'
})
export class AmountFilterComponent {
  filterForm!: FormGroup;
  @Output() amountFilter = new EventEmitter<{ minAmount: string, maxAmount: string }>()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      minAmount: [null],
      maxAmount: [null]
    });
  }

  applyFilters() {
    const value = this.filterForm.value;
    console.log(value);
    this.amountFilter.emit(value);
  }

  reset(){
    const value = this.filterForm.value;
    this.amountFilter.emit({minAmount:"",maxAmount:""});
  }

}
