import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { ClientRegisterService } from '../../Services/client.service';
import { ClientUser } from '../../Models/ClientUser';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  role!: string | null;
  user!: ClientUser;
  kycVierified:boolean = true;

  constructor(private auth: AuthService, private clientSvc: ClientRegisterService) { }


  ngOnInit(): void {
    const user = this.auth.getLoggedInUser();
    const role = this.auth.getUserRole();
    console.log(role);
    this.role = role;
    if(role == "CLIENT_USER"){
      this.fetchClient(Number(user?.userId));
    }

    this.auth.role$.subscribe(role => {
      this.role = role;
    });
  }

  fetchClient(id: number) {
    this.clientSvc.getClientById(id).subscribe((data) => {
      this.user = data;
      this.kycVierified = data.kycVierified;
    },
      (error) => {
        console.log(error)
      })
  }

  logout() {
    this.auth.logout();
  }
}
