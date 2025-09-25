import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientRegisterService } from '../../Services/client.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-document.component.html',
  styleUrls: ['./client-document.component.css']
})
export class ClientDocumentsComponent implements OnInit {
  userId!: number;
  documents: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
  // Use '+' to cast string to number immediately
  this.userId = +this.route.snapshot.paramMap.get('userId')!;

  console.log('Client User ID:', this.userId);

  if (this.userId) {
    this.clientSvc.getClientDocuments(this.userId).subscribe({
      next: (docs) => {
        this.documents = docs;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching documents:', err);
        this.loading = false;
      }
    });
  } else {
    console.error('User ID is invalid!');
    this.loading = false;
  }
}

goBack(): void {
  this.router.navigate(["/ClientUser/" + this.userId]);  // navigates to previous page
}

}
