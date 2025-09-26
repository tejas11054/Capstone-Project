import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientRegisterService } from '../../Services/client.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BeneficiaryService } from '../../Services/beneficiary.service';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})

export class BeneficiariesComponent implements OnInit {
  userId!: number;
  beneficiaries: any[] = [];
  loading = true;

  editingBeneficiary: any = null; 

  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private http: HttpClient,
    private beneficiarySvc : BeneficiaryService,
    private router : Router
  ) {}

  ngOnInit(): void {
  // Option 1: Get from route
  const idFromRoute = this.route.snapshot.paramMap.get('userId');

  // Option 2: Get from localStorage/session (if stored during login)
  const idFromStorage = localStorage.getItem('userId');

  this.userId = idFromRoute ? +idFromRoute : idFromStorage ? +idFromStorage : 0;

  if (this.userId) {
    this.loadBeneficiaries();
  } else {
    console.error('User ID is invalid!');
  }
}


  loadBeneficiaries(): void {
    this.clientSvc.getClientById(this.userId).subscribe({
      next: (clientUser) => {
        console.log("Fetched client user:", clientUser);
        this.beneficiaries = clientUser.beneficiaries || [];
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching beneficiaries:", err);
        this.loading = false;
      }
    });
  }

  startEdit(b: any) {
    this.editingBeneficiary = { ...b }; // copy to avoid overwriting original
  }

  cancelEdit() {
    this.editingBeneficiary = null;
  }

  saveEdit() {
    if (!this.editingBeneficiary) return;

    this.beneficiarySvc.updateBeneficiary(this.editingBeneficiary.beneficiaryId, this.editingBeneficiary)
      .subscribe({
        next: () => {
          alert('Beneficiary updated successfully!');
          this.editingBeneficiary = null;
          this.loadBeneficiaries(); // refresh the table
        },
        error: (err) => {
          console.error('Error updating beneficiary:', err);
          alert('Failed to update beneficiary.');
        }
      });
  }

  deleteBeneficiary(id: number) {
    if (!confirm('Are you sure you want to delete this beneficiary?')) return;

    this.beneficiarySvc.deleteBeneficiary(id).subscribe({
      next: () => {
        alert('Beneficiary deleted successfully!');
        this.beneficiaries = this.beneficiaries.filter(b => b.beneficiaryId !== id);
      },
      error: (err) => {
        console.error('Error deleting beneficiary:', err);
        alert('Failed to delete beneficiary.');
      }
    });
  }

    goBack(): void {
    this.router.navigate(["/ClientUser/" + this.userId]);  // navigates to previous page
  }


}
