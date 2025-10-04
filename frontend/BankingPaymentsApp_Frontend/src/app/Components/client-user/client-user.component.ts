import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClientRegisterService } from '../../Services/client.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-client-user',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './client-user.component.html',
  styleUrls: ['./client-user.component.css']
})
export class ClientUserComponent implements OnInit {
  userId!: number;
  user: any = null;
  loading = true;
  currentComponent: string = 'profile'; 
  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private notify: NotificationService 
  ) {}

  ngOnInit(): void {
    // Get userId from route or localStorage
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    const idFromStorage = localStorage.getItem('userId');

    this.userId = idFromRoute ? +idFromRoute : idFromStorage ? +idFromStorage : 0;

    if (this.userId) {
      this.loadClientData();
    } else {
      console.error('Client User ID is invalid!');
      this.loading = false;
    }
  }

  loadClientData(): void {
    this.clientSvc.getClientById(this.userId).subscribe({
      next: (data: any) => {
        this.user = data;
        this.loading = false;
        console.log('Client User Data:', this.user);
      },
      error: (err) => {
        console.error('Error fetching client data:', err);
        this.loading = false;
      }
    });
  }
}