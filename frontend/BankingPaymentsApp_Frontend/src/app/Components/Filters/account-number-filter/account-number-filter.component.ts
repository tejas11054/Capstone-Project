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
@Output() accountFilter = new EventEmitter<{ payeeAccountNumber: string| null}>()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      payeeAccountNumber:""
    });
  }

  applyFilters() {
    const value = this.filterForm.value;
    this.accountFilter.emit( {
      payeeAccountNumber: value.payeeAccountNumber ? value.payeeAccountNumber : null,
    });
  }

  reset(){
    this.filterForm.reset();
    this.accountFilter.emit({payeeAccountNumber:null})
  }
}
