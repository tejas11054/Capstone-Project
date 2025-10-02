import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QueryService } from '../../../Services/query.service';
import { Query } from '../../../Models/Query';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-query',
  standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './query.html',
  styleUrl: './query.css'
})
export class QueryComponent {

  queryForm: FormGroup;

  constructor(private fb: FormBuilder, private queryService: QueryService) {
    this.queryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submitQuery() {
    if (this.queryForm.invalid) {
      this.queryForm.markAllAsTouched();
      return;
    }

    const query: Query = this.queryForm.value;

    this.queryService.createQuery(query).subscribe({
      next: (res) => {
        alert('Your response has been submitted!');
        this.queryForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to submit your response. Please try again later.');
      }
    });
  }
}
