import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-number-filter',
  imports: [ReactiveFormsModule, NgbDropdownModule, NgbDatepickerModule],
  templateUrl: './account-number-filter.component.html',
  styleUrl: './account-number-filter.component.css'
})
export class AccountNumberFilterComponent {
filterForm!: FormGroup;
@Output() accountFilter = new EventEmitter<{ accountNumber: string}>()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      accountNumber:""
    });
  }

  applyFilters() {
    const value = this.filterForm.value;
    this.accountFilter.emit(value);
  }

  reset(){
    this.accountFilter.emit({accountNumber:""})
  }
}
