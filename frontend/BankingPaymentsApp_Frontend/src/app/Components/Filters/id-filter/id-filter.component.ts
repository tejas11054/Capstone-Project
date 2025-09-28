import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() idFilter = new EventEmitter<{id:number}>()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      id:0
    });
  }

  applyFilters() {
    const value = this.filterForm.value;
    console.log(value);
    this.idFilter.emit(value);
  }

  reset(){
    this.filterForm.reset();
    this.idFilter.emit({id:0});
  }
}
