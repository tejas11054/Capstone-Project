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

    // Banks count
    this.http.get<any[]>(environment.backendURL + "/Bank").subscribe(
      banks => this.banksCount = banks.length
    );

    // Transactions count
    this.http.get<any[]>(environment.backendURL + "/Transaction").subscribe(
      transactions => this.transactionsCount = transactions.length
    );
    
}
}
