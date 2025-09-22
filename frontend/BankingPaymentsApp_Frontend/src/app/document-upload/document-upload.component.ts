import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentUploadService } from '../Services/document-upload.service';
import { DocumentDTO } from '../DTO/DocumentDTO';
import { ProofType, DocProofType } from '../Models/ProofType';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {

  uploadForm: FormGroup;
  proofTypes: ProofType[] = [];
  clientId!: number;

  constructor(
    private fb: FormBuilder,
    private docService: DocumentUploadService,
    private router: Router,
    private route: ActivatedRoute // use ActivatedRoute to get param
  ) {
    this.uploadForm = this.fb.group({
      DocumentName: ['', Validators.required],
      ProofTypeId: [null, Validators.required],
      File: [null, Validators.required]
    });

    this.proofTypes = [
      { TypeId: 1, Type: DocProofType.IDENTITY_PROOF },
      { TypeId: 2, Type: DocProofType.ADDRESS_PROOF },
      { TypeId: 3, Type: DocProofType.DATE_OF_BIRTH_PROOF },
      { TypeId: 4, Type: DocProofType.PHOTOGRAPH },
      { TypeId: 5, Type: DocProofType.PAN_CARD },
      { TypeId: 6, Type: DocProofType.OTHER }
    ];
  }

  ngOnInit() {
  // Get userId from route params
  this.clientId = Number(this.route.snapshot.paramMap.get('userId')) || 0;

  if (!this.clientId) {
    alert('Client ID missing! Redirecting to login.');
    this.router.navigate(['/Login']);
  }
}




  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadForm.patchValue({ File: file });
    }
  }

  upload() {
    if (this.uploadForm.invalid || !this.clientId) {
      alert('Please fill all fields and select a file.');
      return;
    }

    const formValue = this.uploadForm.value;

    const dto: DocumentDTO = {
      DocumentName: formValue['DocumentName'],
      ProofTypeId: formValue['ProofTypeId'],
      ClientId: this.clientId // assign userId to clientId
    };

    const file: File = formValue['File'];

    this.docService.uploadDocument(dto, file).subscribe({
      next: (res) => {
        alert('Document uploaded successfully!');
        this.uploadForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert(err.error || 'Document upload failed!');
      }
    });
  }

  // Helper for template access
  get f() {
    return this.uploadForm.controls;
  }
}