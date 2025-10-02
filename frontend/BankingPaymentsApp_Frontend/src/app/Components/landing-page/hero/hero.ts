import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {

  usersCount: number = 0;
  banksCount: number = 0;
  transactionsCount: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Users count
    this.http.get<any[]>(environment.backendURL + "/User").subscribe(
      users => this.usersCount = users.length
    );

     // Banks count (paginated)
  this.http.get<any>(environment.backendURL + "/Bank?pageNumber=1&pageSize=5").subscribe(
  res => this.banksCount = res.totalRecords || 0
);


  this.http.get<any>(environment.backendURL + "/Transaction?pageNumber=1&pageSize=10").subscribe({
  next: res => this.transactionsCount = res.totalRecords || 0,
  error: err => {
    console.warn("Transaction API error:", err);
    this.transactionsCount = 0; // fallback if no transactions
  }
});


    
}
}
