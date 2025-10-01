import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentDTO } from '../DTO/DocumentDTO';

@Injectable({
  providedIn: 'root'
})
export class DocumentUploadService {

  private apiUrl = 'https://localhost:7030/api/Document/upload';

  constructor(private http: HttpClient) { }

  uploadDocument(dto: DocumentDTO, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('DocumentName', dto.DocumentName);
    formData.append('ProofTypeId', dto.ProofTypeId.toString());
    formData.append('ClientId', dto.ClientId.toString());
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}`, formData);
  }

  deleteDocument(documentId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl.replace('/upload', '')}/${documentId}`);
}

updateDocument(documentId: number, dto: DocumentDTO, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('DocumentName', dto.DocumentName);
  formData.append('ProofTypeId', dto.ProofTypeId.toString());
  formData.append('ClientId', dto.ClientId.toString());
  if (file) {
    formData.append('file', file);
  }

  return this.http.put(`${this.apiUrl.replace('/upload', '')}/update/${documentId}`, formData);
}

getDocumentsByClient(clientId: number, documentName?: string, pageNumber: number = 1, pageSize: number = 10): Observable<any> {
    const url = `${this.apiUrl.replace('/upload', '')}?clientId=${clientId}&DocumentName=${documentName || ''}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }


  
}