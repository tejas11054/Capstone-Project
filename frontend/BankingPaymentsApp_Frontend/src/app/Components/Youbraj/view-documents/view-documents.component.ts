import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Document } from '../../../Models/Document';
import { DocumentUploadService } from '../../../Services/document.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-documents',
  imports: [CommonModule,RouterLink],
  templateUrl: './view-documents.component.html',
  styleUrl: './view-documents.component.css'
})
export class ViewDocumentsComponent implements OnInit {
  documents: any[] = [];
  loading = true;
  activeDoc: any = null;
  activeSafeUrl: SafeResourceUrl | null = null;
  imageCount = 0;
  pdfCount = 0;
  totalCount = 0;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private documentSvc: DocumentUploadService
  ) { }

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    console.log(idFromRoute);
    this.userId = idFromRoute ? +idFromRoute : 0;
    console.log(this.userId);

    if (this.userId) {
      this.loadDocuments();
    }
  }

  loadDocuments(): void {
    this.loading = true;
    this.documentSvc.getDocumentsByClient(this.userId).subscribe((data: any[]) => {
      console.log(data); // logs documents from API

      this.documents = data.filter(d=>d.clientId == this.userId);
      this.totalCount = data.length;
      this.imageCount = data.filter(d => d.type?.toLowerCase().includes('image')).length;
      this.pdfCount = data.filter(d => d.type?.toLowerCase().includes('pdf')).length;

      this.loading = false;
    }, (error) => {
      console.error('Error fetching documents', error);
      this.loading = false;
    });
  }


  viewDocument(doc: any): void {
    this.activeDoc = doc;
    if (doc.type?.toLowerCase().includes('pdf')) {
      this.activeSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(doc.url);
    } else {
      this.activeSafeUrl = this.sanitizer.bypassSecurityTrustUrl(doc.url);
    }
  }
}
