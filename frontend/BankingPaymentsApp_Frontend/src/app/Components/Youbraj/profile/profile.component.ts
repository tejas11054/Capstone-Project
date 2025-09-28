import { Component, OnInit } from '@angular/core';
import { ClientUser } from '../../../Models/ClientUser';
import { ClientUserResponseDTO } from '../../../DTO/ClientUserResponseDTO';
import { ClientRegisterService } from '../../../Services/client.service';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  client!: ClientUser;

  constructor(private auth: AuthService, private clientSvc: ClientRegisterService) { }

  ngOnInit(): void {
    const id = this.auth.getUserId() ?? 0;
    this.fetchClient(id);
  }

  fetchClient(id: number) {
    this.clientSvc.getClientById(id).subscribe((data) => {
      console.log(data);
      this.client = data;
    },
      (error) => {
        console.log(error);
      })
  }
  onEdit(){

  }

  onUpload(){

  }
}
