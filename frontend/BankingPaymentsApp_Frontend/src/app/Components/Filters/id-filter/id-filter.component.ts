import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-id-filter',
  imports: [ReactiveFormsModule, NgbDropdownModule, NgbDatepickerModule],
  templateUrl: './id-filter.component.html',
  styleUrl: './id-filter.component.css'
})
export class IdFilterComponent {
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
