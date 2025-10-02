import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
      users => {
        this.usersCount = users.filter(user => user.userRoleId === 3).length;
      },
      err => {
        console.error("User API error:", err);
        this.usersCount = 0;
      }
    );


    this.http.get<any>(environment.backendURL + "/Bank").subscribe(
      res => {
        console.log("Bank API response:", res);
        this.banksCount = res.totalRecords ?? (Array.isArray(res) ? res.length : 0);
      },
      err => {
        console.error("Bank API error:", err);
        this.banksCount = 0;
      }
    );

    this.http.get<any>(environment.backendURL + "/Transaction").subscribe(
    res => {
      console.log("Transaction API response:", res);
      this.transactionsCount = res.totalRecords ?? (Array.isArray(res) ? res.length : 0);
    },
    err => {
      console.error("Transaction API error:", err);
      this.transactionsCount = 0;
    }
  );

  }
}
