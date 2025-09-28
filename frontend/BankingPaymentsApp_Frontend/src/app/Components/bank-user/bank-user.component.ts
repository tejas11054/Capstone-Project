import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientUser } from '../../Models/ClientUser';
import { Document } from '../../Models/Document';
import { ClientRegisterService } from '../../Services/client.service';

@Component({
  selector: 'app-bank-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './bank-user.component.html',
  styleUrls: ['./bank-user.component.css']
})
export class BankUserComponent implements OnInit {

  clients: ClientUser[] = [];
  selectedClientDocs: Document[] = [];
  selectedClient: ClientUser | null = null; // <-- Added
  showDocuments: boolean = false;
  loading: boolean = true;
  responseMessage: string | null = null;

  constructor(private bankService: ClientRegisterService) { }

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.loading = true;
    this.resetDocuments();
    this.responseMessage = null;

    this.bankService.getClients().subscribe({
      next: (res: any[]) => {
        this.clients = res.map((c: any) => ({
          userId: c.userId ?? c.id,
          userFullName: c.userFullName,
          userName: c.userName,
          password: '',
          userEmail: c.userEmail,
          userPhone: c.userPhone,
          userRoleId: c.userRoleId,
          userJoiningDate: c.userJoiningDate,
          dateOfBirth: c.dateOfBirth,
          address: c.address,
          kycVierified: c.kycVierified,
          documents: [],
          bankId: c.bankId ?? 0,
          bank: c.bank ?? '',
          bankUserId: c.bankUserId,
          bankUser: c.bankUser
        }));
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching clients:', err);
        this.loading = false;
        this.responseMessage = 'Failed to fetch clients.';
      }
    });
  }

  viewDocuments(client: ClientUser) {
    if (!client.userId) {
      alert('Client ID missing!');
      return;
    }

    this.resetDocuments();
    this.selectedClient = client; // <-- Set selected client
    this.responseMessage = null;

    this.bankService.getClientDocuments(client.userId).subscribe({
      next: (docs: any[]) => {
        this.selectedClientDocs = (docs ?? []).map(d => ({
          documentId: d.documentId ?? 0,
          documentName: d.documentName ?? '',
          documentURL: d.documentURL ?? '',
          proofTypeId: d.proofTypeId ?? 0,
          publicId: d.publicId ?? '',
          clientId: d.clientId ?? 0,
          proofType: d.proofType ? { TypeId: d.proofType.typeId, Type: d.proofType.type } : undefined
        }));

        this.showDocuments = this.selectedClientDocs.length > 0;

        if (this.selectedClientDocs.length === 0) {
          this.responseMessage = 'No documents uploaded for this client.';
        }
      },
      error: (err) => {
        console.error('Error fetching documents:', err);
        this.responseMessage = 'Failed to fetch documents.';
      }
    });
  }

  approveClient(client: ClientUser) {
    if (!client.userId) return;

    this.bankService.approveClient(client.userId).subscribe({
      next: () => {
        this.responseMessage = 'Client approved successfully!';
        this.fetchClients();
      },
      error: (err) => {
        console.error('Error approving client:', err);
        this.responseMessage = 'Failed to approve client.';
      }
    });
  }

  rejectClient(client: ClientUser, reason: string) {
    if (!client.userId) return;

    this.bankService.rejectClient(client.userId, reason).subscribe({
      next: (res) => {
        this.responseMessage = res;
        this.fetchClients();
      },
      error: (err) => {
        console.error('Error rejecting client:', err);
        this.responseMessage = 'Failed to reject client.';
      }
    });
  }

  private resetDocuments() {
    this.selectedClientDocs = [];
    this.showDocuments = false;
    this.selectedClient = null; // <-- Reset selected client
  }
}