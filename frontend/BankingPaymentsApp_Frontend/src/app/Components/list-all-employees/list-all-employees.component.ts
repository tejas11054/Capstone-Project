import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { AuthService } from '../../Services/auth.service';
import { Employee } from '../../Models/Employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-all-employees',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-all-employees.component.html',
  styleUrls: ['./list-all-employees.component.css'],
  standalone: true
})
export class ListAllEmployeesComponent implements OnInit {

  employees!: Employee[];
  selectAll: boolean = false;
  selectedEmployees: Employee[] = [];
  selectedEmployeeIds: number[] = [];

  @Output() event = new EventEmitter<{ allEmployees: boolean, employeeIds: number[] }>
  constructor(private auth: AuthService, private employeeSvc: EmployeeService) { }

  ngOnInit(): void {
    const user = this.auth.getLoggedInUser();

    this.employeeSvc.getAllEmployees().subscribe((data) => {
      console.log(data);
      this.employees = data.filter(e => e.clientId == user?.userId);
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
    this.event.emit(payload);
  }

  selectAllEmployees(event: any) {
    if (event.target.checked) {
      this.selectedEmployeeIds = this.employees.map(e => e.employeeId);
    } else {
      this.selectedEmployeeIds = [];
    }

    const payload = {
      allEmployees: event.target.checked,
      employeeIds: this.selectedEmployeeIds.sort()
    };

    this.event.emit(payload);
  }

  deleteEmployee(id: number) {

  }

  editEmployee(employee: Employee) {

  }

  viewEmployee(employee: Employee) {

  }
}
