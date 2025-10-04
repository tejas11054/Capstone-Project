import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ClientRegisterService } from '../../Services/client.service';
import { EmployeeService } from '../../Services/employee.service';
import { SalaryDisbursementService } from '../../Services/salary-disbursement.service';
import { AuthService } from '../../Services/auth.service';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-client-salary-disbursement',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './client-salary-disbursement.component.html',
  styleUrls: ['./client-salary-disbursement.component.css']
})
export class ClientSalaryDisbursementComponent implements OnInit {
  userId!: number;
  allEmployees: any[] = [];
  employees: any[] = [];
  loading = true;

  selectAll = false;
  selectedEmployees: any[] = [];

  salaryDisbursementForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private employeeSvc: EmployeeService,
    private salaryDisbursementSvc: SalaryDisbursementService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private notify: NotificationService 
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('userId');
    const idFromStorage = localStorage.getItem('userId');

    this.userId = idFromRoute ? +idFromRoute : idFromStorage ? +idFromStorage : 0;

    if (this.userId > 0) {
      this.loadEmployees();
      this.initForm();
    } else {
      console.error('User ID is invalid!');
      this.loading = false;
    }
  }

  initForm(): void {
    this.salaryDisbursementForm = this.fb.group({
      clientId: this.userId,
      allEmployees: true,
      employeeIds: []
    });
  }

  loadEmployees(): void {
    this.loading = true;
    this.clientSvc.getClientById(this.userId).subscribe({
      next: (clientUser) => {
        this.allEmployees = ( clientUser.employees as any[] || []).filter(e => e.isActive);
        this.employees = [...this.allEmployees];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.loading = false;
      }
    });
  }

  // Toggle select all
  selectAllEmployees(event: any): void {
    this.selectAll = event.target.checked;
    this.selectedEmployees = this.selectAll ? [...this.employees] : [];
  }

  // Check if employee is selected
  isSelected(employee: any): boolean {
    return this.selectedEmployees.includes(employee);
  }

  // Toggle individual selection
  onEmployeeSelect(employee: any, event: any): void {
    if (event.target.checked) {
      this.selectedEmployees.push(employee);
    } else {
      this.selectedEmployees = this.selectedEmployees.filter(e => e !== employee);
      this.selectAll = false;
    }
  }

  // Submit salary disbursement
  createSalaryDisbursement(): void {
    const payload = {
      clientId: this.userId,
      allEmployees: this.selectAll,
      employeeIds: this.selectAll ? [] : this.selectedEmployees.map(e => e.employeeId)
    };

    console.log('Salary Disbursement Payload:', payload);

    this.salaryDisbursementSvc.createSalaryDisbursement(payload).subscribe({
      next: (res) => {
        this.notify.success('Salary disbursement created successfully!');
        // optionally reset selection
        this.selectAll = false;
        this.selectedEmployees = [];
      },
      error: (err) => {
        console.error(err);
        this.notify.error('Failed to create salary disbursement.');
      }
    });
  }
}