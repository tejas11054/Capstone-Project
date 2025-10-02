import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentStatusPipe } from '../../../Pipes/payment-status.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boolean-filter',
  imports: [FormsModule, ReactiveFormsModule, NgbDropdownModule, NgbDatepickerModule, CommonModule],
  templateUrl: './boolean-filter.component.html',
  styleUrl: './boolean-filter.component.css'
})
export class BooleanFilterComponent {
  filterForm!: FormGroup;

  @Input() statusOptions: { id: boolean; name: string }[] = [];
  @Output() booleanFilter = new EventEmitter<{ isActive: boolean | null }>()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      isActive: [null]
    });
  }

  applyFilters() {
    const value = this.filterForm.value;
    console.log(value)
    this.booleanFilter.emit(value);
  }

  reset() {
    this.filterForm.reset();
    this.booleanFilter.emit({ isActive: null })
  }
}
