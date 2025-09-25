import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-user',
  imports: [CommonModule, RouterModule],
  templateUrl: './client-user.component.html',
  styleUrls: ['./client-user.component.css']
})
export class ClientUserComponent implements OnInit {
  userId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Client User ID:", this.userId);
  }
}