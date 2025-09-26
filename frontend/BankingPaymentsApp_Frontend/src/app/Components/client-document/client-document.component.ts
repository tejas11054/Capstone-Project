import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientRegisterService } from '../../Services/client.service';
import { DocumentUploadService } from '../../Services/document.service';
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

  // Store preview files for update
  previewFiles: { [docId: number]: { file: File, url: string } } = {};

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

  // When user selects a file
  onFileSelected(doc: any, event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      this.previewFiles[doc.documentId] = { file, url };
    }
  }

  // Confirm update
  confirmUpdate(doc: any): void {
    const preview = this.previewFiles[doc.documentId];
    if (!preview) {
      alert("Please select a file before updating.");
      return;
    }

    const dto = {
      DocumentName: doc.documentName,
      ProofTypeId: doc.proofTypeId,
      ClientId: this.userId
    };

    this.documentSvc.updateDocument(doc.documentId, dto, preview.file).subscribe({
      next: () => {
        alert("Document updated successfully.");
        delete this.previewFiles[doc.documentId]; // clear preview
        this.loadDocuments();
      },
      error: (err) => {
        console.error("Error updating document:", err);
        alert("Failed to update document.");
      }
    });
  }

  goBack(): void {
    this.router.navigate(["/ClientUser/" + this.userId]); 
  }

  uploadDocument(){
    this.router.navigate(['DocumentUpload/' + this.userId]);
  }
}