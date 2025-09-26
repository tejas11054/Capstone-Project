import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientRegisterService } from '../../Services/client.service';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeesComponent implements OnInit {
  userId!: number;
  employees: any[] = [];
  loading = true;
  editingEmployee: any = null;
  csvFile!: File;
  updateCSVFile!: File ;

  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private employeeSvc: EmployeeService,
    private router: Router
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
    this.clientSvc.getClientById(this.userId).subscribe({
      next: (clientUser) => {
        this.employees = clientUser.employees || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.loading = false;
      }
    });
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
          alert('Employee updated successfully!');
          this.editingEmployee = null;
          this.loadEmployees();
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          alert('Failed to update employee.');
        }
      });
  }

  deleteEmployee(id: number) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.employeeSvc.deleteEmployee(id).subscribe({
      next: () => {
        alert('Employee deleted successfully!');
        this.employees = this.employees.filter(e => e.employeeId !== id);
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
        alert('Failed to delete employee.');
      }
    });
  }


onCSVSelected(event: any) {
  const file: File = event.target.files[0];
  if (file && file.type === 'text/csv') {
    this.csvFile = file;
  } else {
    alert('Please select a valid CSV file.');
    event.target.value = ''; // clear invalid file
  }
}

uploadCSV() {
  if (!this.csvFile) {
    alert('No CSV file selected.');
    return;
  }

  this.employeeSvc.uploadCSV(this.csvFile).subscribe({
    next: (res: string) => {
      alert(res); // Show success message from backend
      this.loadEmployees(); // reload employee table
    },
    error: (err) => {
      console.error('Error uploading CSV:', err);
      alert('Failed to upload CSV.');
    }
  });
}

// File selection for update CSV
onUpdateCSVFileSelect(event: any) {
  this.updateCSVFile = event.target.files[0];
}

// Upload update CSV
uploadUpdateCSVByClient() {
  if (!this.updateCSVFile) {
    alert('No CSV file selected for update.');
    return;
  }

  const clientId = this.userId; // Assuming userId is already available in component

  this.employeeSvc.uploadUpdateCSVByClient(this.updateCSVFile, clientId).subscribe({
    next: (res: string) => {
      alert(res);
      this.loadEmployees(); // reload the table
    },
    error: (err) => {
      console.error('Error updating employees via CSV:', err);
      alert('Failed to update employees via CSV.');
    }
  });
}

goBack(): void {
    this.router.navigate(["/ClientUser/" + this.userId]);  // navigates to previous page
  }


}
