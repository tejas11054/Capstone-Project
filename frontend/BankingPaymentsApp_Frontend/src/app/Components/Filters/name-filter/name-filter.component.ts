import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() nameFilter = new EventEmitter<{ payerName: string }>()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      payerName: ""
    });
  }

  applyFilters() {
    const value = this.filterForm.value;
    this.nameFilter.emit(value);
  }

  reset() {
    this.filterForm.reset();
    this.nameFilter.emit({ payerName: "" })
  }
}
