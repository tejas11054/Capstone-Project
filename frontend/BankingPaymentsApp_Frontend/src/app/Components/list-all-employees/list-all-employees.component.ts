import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { AuthService } from '../../Services/auth.service';
import { Employee } from '../../Models/Employee';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusFilterComponent } from '../Filters/status-filter/status-filter.component';
import { NameFilterComponent } from '../Filters/name-filter/name-filter.component';
import { IdFilterComponent } from '../Filters/id-filter/id-filter.component';
import { AccountNumberFilterComponent } from '../Filters/account-number-filter/account-number-filter.component';
import { AmountFilterComponent } from '../Filters/amount-filter/amount-filter.component';
import { DateFilterComponent } from '../Filters/date-filter/date-filter.component';
import { RejectModalComponent } from '../Shared/reject-modal/reject-modal.component';
import { RouterLink } from '@angular/router';
import { SalaryDisbursementService } from '../../Services/salary-disbursement.service';
import { EmployeeUploadComponent } from '../Youbraj/employee-upload/employee-upload.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-list-all-employees',
  imports: [CommonModule, FormsModule, CommonModule, RouterLink, EmployeeUploadComponent, RejectModalComponent, ReactiveFormsModule, DateFilterComponent, AmountFilterComponent, AccountNumberFilterComponent, IdFilterComponent, NameFilterComponent, StatusFilterComponent],
  templateUrl: './list-all-employees.component.html',
  styleUrls: ['./list-all-employees.component.css'],
  standalone: true
})
export class ListAllEmployeesComponent implements OnInit {

  employees!: Employee[];
  selectAll: boolean = false;
  selectedEmployees: Employee[] = [];
  selectedEmployeeIds: number[] = [];
  filters: any = {};
  role!:string;

  // @Output() event = new EventEmitter<{ allEmployees: boolean, employeeIds: number[] }>
  constructor(private auth: AuthService, private employeeSvc: EmployeeService, private disbursementSvc: SalaryDisbursementService) { }

  ngOnInit(): void {
    const user = this.auth.getLoggedInUser();
    const role = this.auth.getUserRole();
    console.log(role);
    if(role == "CLIENT_USER"){
      console.log("helo")
      console.log(user?.userId)
      this.role = role;
      this.filters.clientId =  user?.userId;
    }
    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllEmployees(params);
  }

  fetchAllEmployees(params: any) {
    this.employeeSvc.getAllEmployees(params).subscribe((data) => {
      console.log(data);
      this.employees = data;
    },
      (error) => {
        console.log(error);
      })
  }

  isSelected(employee: Employee): boolean {
    return this.selectedEmployeeIds.includes(employee.employeeId);
  }

  onEmployeeSelect(employee: Employee, event: any) {
    if (event.target.checked) {
      if (!this.selectedEmployeeIds.includes(employee.employeeId)) {
        this.selectedEmployeeIds.push(employee.employeeId);
      }
    } else {
      this.selectedEmployeeIds = this.selectedEmployeeIds.filter(
        id => id !== employee.employeeId
      );
    }

    console.log('Selected Employee IDs:', this.selectedEmployeeIds);

    const payload = {
      allEmployees: this.selectAll = this.selectedEmployeeIds.length === this.employees.length,
      employeeIds: this.selectedEmployeeIds.sort()
    };
    // this.event.emit(payload);
  }

  selectAllEmployees(event: any) {
    if (event.target.checked) {
      this.selectedEmployeeIds = this.employees.filter(e=>e.isActive).map(e => e.employeeId);
    } else {
      this.selectedEmployeeIds = [];
    }

    const payload = {
      allEmployees: event.target.checked,
      employeeIds: this.selectedEmployeeIds.sort()
    };

    // this.event.emit(payload);
  }

  createDisbursement() {
    const payload = {
      clientId: this.auth.getUserId() ?? 0,
      allEmployees: this.selectedEmployeeIds.length === this.employees.length,
      employeeIds: this.selectedEmployeeIds.sort()
    };
    this.disbursementSvc.createSalaryDisbursement(payload).subscribe((data) => {
      console.log(data);
    },
      (error) => {
        console.log(error);
      })
  }

  deleteEmployee(id: number) {
    this.employeeSvc.deleteEmployee(id).subscribe((data) => {
      console.log(data);
      alert("employee deleted sucessfully!");
    },
      (error) => {
        console.log(error)
      })
  }

  editEmployee(employee: Employee) {

  }

  viewEmployee(employee: Employee) {

  }

  onDateFilter(dates: { dateFrom: string; dateTo: string }) {

    this.filters.createdFrom = dates.dateFrom;
    this.filters.createdTo = dates.dateTo;
    console.log(this.filters);

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllEmployees(params);
  }

  onAmountFilter(amount: { minAmount: string | null, maxAmount: string | null }) {
    // this.filters.minSalary = amount.minAmount;
    // this.filters.maxSalary = amount.maxAmount;
    if (amount.minAmount !== null) {
      this.filters.minSalary = amount.minAmount;
    } else {
      delete this.filters.minSalary; // ✅ remove old value
    }
    if (amount.maxAmount !== null) {
      this.filters.maxSalary = amount.maxAmount;
    } else {
      delete this.filters.maxSalary; // ✅ remove old value
    }

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllEmployees(params);
  }

  onAccountFilter(account: { payeeAccountNumber: string | null }) {
    // this.filters.accountNumber = account.payeeAccountNumber;
    console.log(this.filters);

    if (account.payeeAccountNumber !== null) {
      this.filters.accountNumber = account.payeeAccountNumber;
    } else {
      delete this.filters.accountNumber; // ✅ remove old value
    }

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllEmployees(params);
  }

  fetchById(value: { id: number }) {
    if (value.id == 0) {
      const params = new URLSearchParams(this.filters).toString();
      this.fetchAllEmployees(params);
    } else {
      this.employeeSvc.getEmployeeById(value.id).subscribe((data) => {
        console.log(data);
        this.employees = [data];
      },
        (error) => {
          alert("no employee of id: " + value.id);
        })
    }
  }

  onNameFilter(name: { payerName: string }) {
    this.filters.employeeName = name.payerName;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllEmployees(params);
  }

  onStatusFilter(status: { paymentStatusId: string }) {
    this.filters.paymentStatusId = status.paymentStatusId;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchAllEmployees(params);
  }

  downloadPDF(): void {
    if (!this.employees || this.employees.length === 0) {
      alert('No Employees to export!');
      return;
    }

    const doc = new jsPDF();
    doc.text('Employees Report', 14, 16);

    const tableColumn = ['#', 'Transaction ID', 'Type', 'Amount', 'Date'];
    const tableRows: any[] = [];

    this.employees.forEach((t, i) => {
      tableRows.push([
        i + 1,
        t.employeeId,
        t.employeeName,
        t.isActive,
        t.accountNumber,
        t.salary
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save(`Employees_User_${this.employees[0].clientId}.pdf`);
  }
}
