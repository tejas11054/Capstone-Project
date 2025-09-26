import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentUploadService } from '../../Services/document.service';
import { DocumentDTO } from '../../DTO/DocumentDTO';
import { ProofType, DocProofType } from '../../Models/ProofType';

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
  documentFields = ['Document1', 'Document2', 'Document3', 'Document4'];
  previewUrls: { [key: string]: string | ArrayBuffer | null } = {};

  constructor(
    private fb: FormBuilder,
    private docService: DocumentUploadService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize form with 4 document sub-groups
    const group: any = {};
    this.documentFields.forEach(doc => {
      group[doc] = this.fb.group({
        DocumentName: ['', Validators.required],
        ProofTypeId: [null, Validators.required],
        File: [null, Validators.required]
      });
    });
    this.uploadForm = this.fb.group(group);

    // Proof types
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

  // Helper to get a FormGroup for each document
  getFormGroup(docField: string): FormGroup {
    return this.uploadForm.get(docField) as FormGroup;
  }

  // Handle file selection
 onFileSelected(event: any, docField: string) {
  const file = event.target.files[0];
  if (file) {
    this.getFormGroup(docField).patchValue({ File: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrls[docField] = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

isImage(url: string | ArrayBuffer | null): boolean {
  return typeof url === 'string' && url.startsWith('data:image');
}

isPdf(url: string | ArrayBuffer | null): boolean {
  return typeof url === 'string' && url.startsWith('data:application/pdf');
}


  // Upload all documents at once
  uploadAllDocuments() {
  if (this.documentFields.some(doc => this.getFormGroup(doc).invalid)) {
    alert('Please fill all fields and select files for all documents.');
    return;
  }

  const uploadObservables = this.documentFields.map(doc => {
    const formGroup = this.getFormGroup(doc);
    const formValue = formGroup.value;
    const dto: DocumentDTO = {
      DocumentName: formValue['DocumentName'],
      ProofTypeId: formValue['ProofTypeId'],
      ClientId: this.clientId
    };
    const file: File = formValue['File'];
    return this.docService.uploadDocument(dto, file);
  });

  // Upload all documents in parallel
  Promise.all(uploadObservables.map(obs => obs.toPromise()))
    .then(() => {
      alert('All documents uploaded successfully!');
      this.router.navigate([`/ClientUser/${this.clientId}`]); 
    })
    .catch(err => {
      console.error(err);
      alert('One or more document uploads failed.');
    });
}

}