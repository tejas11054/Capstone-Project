import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  role!:string | null;

  constructor(private auth:AuthService){}


  ngOnInit(): void {
    const user = this.auth.getLoggedInUser();
    const role = this.auth.getUserRole();
    console.log(role);
    this.role = role;

    this.auth.role$.subscribe(role => {
      this.role = role;
    });
  }

  logout(){
    this.auth.logout();
  }
}
