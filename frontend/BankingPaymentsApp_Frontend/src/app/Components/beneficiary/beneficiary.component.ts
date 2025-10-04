import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientRegisterService } from '../../Services/client.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BeneficiaryService } from '../../Services/beneficiary.service';
import { BeneficiaryRegisterComponent } from '../beneficiary-register/beneficiary-register.component';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BeneficiaryRegisterComponent],
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})
export class BeneficiariesComponent implements OnInit {
  userId!: number;
  beneficiaries: any[] = [];
  pagedBeneficiaries: any[] = [];
  loading = true;
  showAddBeneficiary: boolean = false; 

  filters: any = {};
  editingBeneficiary: any = null;

  // Pagination
  pageNumber: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private http: HttpClient,
    private beneficiarySvc: BeneficiaryService,
    private router: Router,
    private notify: NotificationService 
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('userId');
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
        this.totalRecords = this.beneficiaries.length;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.applyPagination();
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching beneficiaries:", err);
        this.loading = false;
      }
    });
  }

  applyPagination(): void {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedBeneficiaries = this.beneficiaries.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.applyPagination();
  }

  startEdit(b: any) {
    this.editingBeneficiary = { ...b }; // copy to avoid overwriting original
  }

  cancelEdit() {
    this.editingBeneficiary = null;
  }

  editBeneficiary(beneficiary: any) {}

  saveEdit() {
    if (!this.editingBeneficiary) return;
    this.beneficiarySvc.updateBeneficiary(this.editingBeneficiary.beneficiaryId, this.editingBeneficiary)
      .subscribe({
        next: () => {
          this.notify.success('Beneficiary updated successfully!');
          this.editingBeneficiary = null;
          this.loadBeneficiaries();
        },
        error: (err) => {
          console.error('Error updating beneficiary:', err);
          this.notify.error('Failed to update beneficiary.');
        }
      });
  }

  deleteBeneficiary(id: number) {
    if (!confirm('Are you sure you want to delete this beneficiary?')) return;
    this.beneficiarySvc.deleteBeneficiary(id).subscribe({
      next: () => {
        this.notify.error('Beneficiary deleted successfully!');
        this.beneficiaries = this.beneficiaries.filter(b => b.beneficiaryId !== id);
        this.totalRecords = this.beneficiaries.length;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.applyPagination();
      },
      error: (err) => {
        console.error('Error deleting beneficiary:', err);
        this.notify.error('Failed to delete beneficiary.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(["/ClientUser/" + this.userId]);
  }

  onNameFilter(name: { payerName: string }) {
    this.filters.beneficiaryName = name.payerName;
    const params = new URLSearchParams(this.filters).toString();
    this.loadBeneficiaries();
  }
}
