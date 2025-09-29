import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { filter } from 'rxjs';
import { AuthService } from './Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
   standalone: true, 
  imports: [RouterOutlet,SidebarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'BankingPaymentsApp_Frontend';
  role!:string | null;
  constructor(private auth:AuthService){}

  ngOnInit(): void {
    this.auth.role$.subscribe(role => {
      this.role = role;
    });
  }

}
