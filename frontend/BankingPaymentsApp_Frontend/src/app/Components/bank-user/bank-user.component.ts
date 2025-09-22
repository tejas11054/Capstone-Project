import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BankUserService } from '../../Services/bank-user.service';
import { ClientUser } from '../../Models/ClientUser';
import { Document } from '../../Models/Document';

@Component({
  selector: 'app-bank-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bank-user.component.html',
  styleUrls: ['./bank-user.component.css']
})
export class BankUserComponent implements OnInit {

  clients: ClientUser[] = [];
  selectedClientDocs: Document[] = [];
  showDocuments: boolean = false;

  constructor(private bankService: BankUserService) {}

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.bankService.getClients().subscribe({
      next: (res: any[]) => {
        this.clients = res.map((c: any) => ({
          UserId: c.userId ?? c.id, 
          UserFullName: c.userFullName,
          UserName: c.userName,
          Password: '', // required by ClientUser
          UserEmail: c.userEmail,
          UserPhone: c.userPhone,
          DateOfBirth: c.dateOfBirth,
          Address: c.address,
          KycVierified: c.kycVierified,
          UserRoleId: c.userRoleId,
          UserJoiningDate: c.userJoiningDate,
          Documents: [] // do not prefill here, fetch individually
        }));
      },
      error: err => console.error('Error fetching clients:', err)
    });
  }

  viewDocuments(client: ClientUser) {
    if (!client.UserId) {
      alert('Client ID missing!');
      return;
    }

    // Reset previous documents
    this.selectedClientDocs = [];
    this.showDocuments = false;

    this.bankService.getClientDocuments(client.UserId).subscribe({
      next: (docs: any[]) => {
        this.selectedClientDocs = (docs ?? []).map(d => ({
          DocumentId: d.documentId ?? 0,
          DocumentName: d.documentName ?? '',
          DocumentURL: d.documentURL ?? '',
          ProofTypeId: d.proofTypeId ?? 0,
          PublicId: d.publicId ?? '',
          ClientId: d.clientId ?? 0,
          ProofType: d.proofType ? { TypeId: d.proofType.typeId, Type: d.proofType.type } : undefined
        }));

        this.showDocuments = this.selectedClientDocs.length > 0;

        if (this.selectedClientDocs.length === 0) {
          alert('No documents uploaded for this client.');
        }
      },
      error: (err) => {
        console.error('Error fetching documents:', err);
        alert('Failed to fetch documents. Check console.');
      }
    });
  }

approveClient(client: ClientUser) {
  this.bankService.approveClient(client.UserId!).subscribe({
    next: () => {
      alert('Client approved successfully!');
      this.fetchClients();
      this.selectedClientDocs = [];
      this.showDocuments = false;
    },
    error: (err) => {
      console.error('Error approving client:', err);
      alert('Failed to approve client. Check console.');
    }
  });
}



rejectClient(client: ClientUser, reason: string) {
  this.bankService.rejectClient(client.UserId!, reason).subscribe({
    next: (res) => {
      alert(res); // shows message from backend
      this.fetchClients();
      this.selectedClientDocs = [];
      this.showDocuments = false;
    },
    error: (err) => console.error('Error rejecting client:', err)
  });
}



}