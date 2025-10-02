import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() title:string = "Amount";
  @Output() amountFilter = new EventEmitter<{ minAmount: string | null, maxAmount: string | null }>()
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
    this.amountFilter.emit({
      minAmount: value.minAmount ? value.minAmount.toString() : null,
      maxAmount: value.maxAmount ? value.maxAmount.toString() : null
    });
  }

  reset() {
    const value = this.filterForm.value;
    this.filterForm.reset();
    this.amountFilter.emit({ minAmount: null, maxAmount: null });
  }

}
