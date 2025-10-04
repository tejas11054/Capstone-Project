import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientRegisterService } from '../../Services/client.service';
import { DocumentUploadService } from '../../Services/document.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-client-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-document.component.html',
  styleUrls: ['./client-document.component.css']
})
export class ClientDocumentsComponent implements OnInit {
  userId!: number;
  documents: any[] = [];
  filteredDocuments: any[] = [];
  loading = true;
  filterDocumentName: string = '';

  // Pagination
  pageNumber = 1;
  pageSize = 6; // Number of cards per page
  totalRecords = 0;
  totalPages = 0;
  totalPagesArray: number[] = [];

  // Store preview files for update
  previewFiles: { [docId: number]: { file: File, url: string } } = {};

  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private documentSvc: DocumentUploadService,
    private router: Router,
    private notify: NotificationService 
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
    if (this.userId) this.loadDocuments();
    else this.loading = false;
  }

  loadDocuments(): void {
    this.loading = true;
    this.documentSvc.getDocumentsByClient(this.userId, this.filterDocumentName, this.pageNumber, this.pageSize)
      .subscribe({
        next: (res: any) => {
          this.documents = res.data || [];
          this.totalRecords = res.totalRecords || this.documents.length;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.filteredDocuments = [...this.documents];
          this.loading = false;
        },
        error: err => {
          console.error('Error fetching documents:', err);
          this.loading = false;
        }
      });
  }

  applyFilter(): void {
    this.pageNumber = 1;
    this.loadDocuments();
  }

  resetFilter(): void {
    this.filterDocumentName = '';
    this.applyFilter();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.loadDocuments();
  }

  deleteDocument(documentId: number): void {
    if (!confirm('Are you sure you want to delete this document?')) return;

    this.documentSvc.deleteDocument(documentId).subscribe({
      next: () => {
        this.notify.success('Document deleted successfully.');
        this.loadDocuments();
      },
      error: err => {
        console.error('Error deleting document:', err);
        this.notify.error('Failed to delete document.');
      }
    });
  }

  onFileSelected(doc: any, event: any): void {
    const file: File = event.target.files[0];
    if (file) this.previewFiles[doc.documentId] = { file, url: URL.createObjectURL(file) };
  }

  confirmUpdate(doc: any): void {
    const preview = this.previewFiles[doc.documentId];
    if (!preview) { this.notify.warning("Please select a file before updating."); return; }

    const dto = { DocumentName: doc.documentName, ProofTypeId: doc.proofTypeId, ClientId: this.userId };
    this.documentSvc.updateDocument(doc.documentId, dto, preview.file).subscribe({
      next: () => { this.notify.success("Document updated successfully."); delete this.previewFiles[doc.documentId]; this.loadDocuments(); },
      error: err => { console.error("Error updating document:", err); alert("Failed to update document."); }
    });
  }

  goBack(): void { this.router.navigate(["/ClientUser/" + this.userId]); }
  uploadDocument(): void { this.router.navigate(['DocumentUpload/' + this.userId]); }
}
