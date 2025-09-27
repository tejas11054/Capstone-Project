import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-name-filter',
  imports: [ReactiveFormsModule, NgbDropdownModule, NgbDatepickerModule],
  templateUrl: './name-filter.component.html',
  styleUrl: './name-filter.component.css'
})
export class NameFilterComponent {
filterForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      dateFrom: [null],
      dateTo: [null]
    });
  }

  applyFilters() {
    const value = this.filterForm.value;
    // TODO: Apply the filter logic to your data source
  }
}
