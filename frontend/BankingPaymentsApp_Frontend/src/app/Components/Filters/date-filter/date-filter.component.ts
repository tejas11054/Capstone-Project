import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-filter',
  imports: [ReactiveFormsModule, NgbDropdownModule, NgbDatepickerModule],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.css'
})
export class DateFilterComponent implements OnInit {
  filterForm!: FormGroup;

  @Output() dateFilter = new EventEmitter<{ dateFrom: string, dateTo: string }>()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const today = new Date();
    this.filterForm = this.fb.group({
      dateFrom: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      },
      dateTo: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      }
    });
  }

  applyFilters() {
    const value = this.filterForm.value;

    let dateFrom = new Date(value.dateFrom.year, value.dateFrom.month - 1, value.dateFrom.day);
    let dateTo = new Date(value.dateTo.year, value.dateTo.month - 1, value.dateTo.day);

    dateTo.setHours(23, 59, 59, 999);

    // format without timezone shift
    const formatDate = (d: Date) =>
      d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');

    const date1 = formatDate(dateFrom);
    const date2 = formatDate(dateTo);

    console.log('dateFrom:', date1);
    console.log('dateTo:', date2);

    this.dateFilter.emit({ dateFrom: date1, dateTo: date2 });
  }

  reset() {
    this.dateFilter.emit({ dateFrom: "", dateTo: "" });
  }
}
