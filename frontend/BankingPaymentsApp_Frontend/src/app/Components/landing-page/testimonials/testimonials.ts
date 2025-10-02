import { Component } from '@angular/core';
import { QueryService } from '../../../Services/query.service';
import { Query } from '../../../Models/Query';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})

export class Testimonials {
    queries: Query[] = [];

  constructor(private queryService: QueryService) {}

  ngOnInit(): void {
    this.queryService.getAllQueries().subscribe({
      next: (res) => {
      
       this.queries = res
        .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
        .slice(0, 3);
      },
      error: (err) => console.error(err)
    });
  }
  
}
