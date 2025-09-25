import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientRegisterService } from '../../Services/client.service';
import { DocumentUploadService } from '../../Services/document-upload.service';
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
    private documentSvc: DocumentUploadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
    console.log('Client User ID:', this.userId);

    if (this.userId) {
      this.loadDocuments();
    } else {
      console.error('User ID is invalid!');
      this.loading = false;
    }
  }

  loadDocuments(): void {
    this.clientSvc.getClientDocuments(this.userId).subscribe({
      next: (docs) => {
        console.log('Fetched documents from API:', docs); 
        this.documents = docs;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching documents:', err);
        this.loading = false;
      }
    });
  }

  deleteDocument(documentId: number): void {
  if (!documentId) {
    console.error('Document ID is missing.');
    alert('Document ID is missing. Cannot delete.');
    return;
  }

  if (confirm('Are you sure you want to delete this document?')) {
    this.documentSvc.deleteDocument(documentId).subscribe({
      next: () => {
        alert('Document deleted successfully.');
        this.documents = this.documents.filter(doc => doc.documentId !== documentId);
      },
      error: (err) => {
        console.error('Error deleting document:', err);
        alert('Failed to delete document. Check console for details.');
      }
    });
  }
}






  goBack(): void {
    this.router.navigate(["/ClientUser/" + this.userId]); 
  }
}