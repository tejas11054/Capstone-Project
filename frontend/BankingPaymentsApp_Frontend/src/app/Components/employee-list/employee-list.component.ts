import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientRegisterService } from '../../Services/client.service';
import { EmployeeService } from '../../Services/employee.service';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeesComponent implements OnInit {
  userId!: number;
  allEmployees: any[] = []; // original employee list for this client
  employees: any[] = []; // displayed filtered list
  loading = true;
  editingEmployee: any = null;
  csvFile!: File;
  updateCSVFile!: File;

  // Filter fields
  filterName?: string;
  filterAccountNumber?: string;
  filterBankName?: string;
  filterIFSC?: string;
  filterSalary?: number;

  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private employeeSvc: EmployeeService,
    private router: Router,
    private notify: NotificationService 
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('userId');
    const idFromStorage = localStorage.getItem('userId');

    this.userId = idFromRoute ? +idFromRoute : idFromStorage ? +idFromStorage : 0;

    if (this.userId > 0) {
      this.loadEmployees();
    } else {
      console.error('User ID is invalid!');
      this.loading = false;
    }
  }

  loadEmployees(): void {
    this.loading = true;
    // Fetch client info which includes employees
    this.clientSvc.getClientById(this.userId).subscribe({
      next: (clientUser) => {
        this.allEmployees = clientUser.employees || [];
        this.employees = [...this.allEmployees]; // initialize display
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.allEmployees];

    if (this.filterName) {
      filtered = filtered.filter(e => e.employeeName.toLowerCase().includes(this.filterName!.toLowerCase()));
    }
    if (this.filterAccountNumber) {
      filtered = filtered.filter(e => e.accountNumber.toLowerCase().includes(this.filterAccountNumber!.toLowerCase()));
    }
    if (this.filterBankName) {
      filtered = filtered.filter(e => e.bankName.toLowerCase().includes(this.filterBankName!.toLowerCase()));
    }
    if (this.filterIFSC) {
      filtered = filtered.filter(e => e.ifsc.toLowerCase().includes(this.filterIFSC!.toLowerCase()));
    }
    if (this.filterSalary != null) {
      filtered = filtered.filter(e => e.salary === this.filterSalary);
    }

    this.employees = filtered;
  }

  resetFilters(): void {
    this.filterName = '';
    this.filterAccountNumber = '';
    this.filterBankName = '';
    this.filterIFSC = '';
    this.filterSalary = undefined;
    this.employees = [...this.allEmployees];
  }

  startEdit(emp: any) {
    this.editingEmployee = { ...emp };
  }

  cancelEdit() {
    this.editingEmployee = null;
  }

  saveEdit() {
    if (!this.editingEmployee) return;

    this.employeeSvc.updateEmployee(this.editingEmployee.employeeId, this.editingEmployee)
      .subscribe({
        next: () => {
          this.notify.success('Employee updated successfully!');
          this.editingEmployee = null;
          this.loadEmployees();
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          this.notify.error('Failed to update employee.');
        }
      });
  }

  deleteEmployee(id: number) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.employeeSvc.deleteEmployee(id).subscribe({
      next: () => {
        this.notify.success('Employee deleted successfully!');
        this.employees = this.employees.filter(e => e.employeeId !== id);
        this.allEmployees = this.allEmployees.filter(e => e.employeeId !== id);
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
        this.notify.error('Failed to delete employee.');
      }
    });
  }

  onCSVSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'text/csv') this.csvFile = file;
    else this.notify.error('Please select a valid CSV file.');
  }

  // uploadCSV() {
  //   if (!this.csvFile) { alert('No CSV file selected.'); return; }
  //   this.employeeSvc.uploadCSV(this.csvFile).subscribe({
  //     next: (res: string) => { alert(res); this.loadEmployees(); },
  //     error: (err) => { console.error(err); alert('Failed to upload CSV.'); }
  //   });
  // }

  onUpdateCSVFileSelect(event: any) {
    this.updateCSVFile = event.target.files[0];
  }

  uploadUpdateCSVByClient() {
    if (!this.updateCSVFile) { this.notify.error('No CSV file selected.'); return; }
    this.employeeSvc.uploadUpdateCSVByClient(this.updateCSVFile, this.userId).subscribe({
      next: (res: string) => { this.notify.warning(res); this.loadEmployees(); },
      error: (err) => { console.error(err); this.notify.error('Failed to update employees via CSV.'); }
    });
  }

  goBack(): void {
    this.router.navigate(['/ClientUser/' + this.userId]);
  }
}