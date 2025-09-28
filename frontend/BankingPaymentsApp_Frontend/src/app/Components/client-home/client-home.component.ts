import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { ClientRegisterService } from '../../Services/client.service';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-dashboard-home',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  userData: any;
  totalBalance: number = 0;

  // Employees Doughnut
  employeeChartData!: ChartData<'doughnut'>;
  employeeChartOptions: ChartOptions<'doughnut'> = { responsive: true };
  employeeChartType = 'doughnut' as const; // <--- cast as const

  // Beneficiaries Bar
  beneficiaryChartData!: ChartData<'bar'>;
  beneficiaryChartOptions: ChartOptions<'bar'> = { responsive: true };
  beneficiaryChartType = 'bar' as const; // <--- cast as const

  // Salary Bar
  salaryChartData!: ChartData<'bar'>;
  salaryChartOptions: ChartOptions<'bar'> = { responsive: true };
  salaryChartType = 'bar' as const; // <--- cast as const

  constructor(private clientService: ClientRegisterService) {}

  ngOnInit(): void {
    this.clientService.getClientById(2).subscribe(data => {
      this.userData = data;
      this.totalBalance = data.account?.balance || 0;

      this.setupEmployeeChart();
      this.setupBeneficiaryChart();
      this.setupSalaryChart();
    });
  }

  setupEmployeeChart() {
    const active = this.userData.employees.filter((e: any) => e.isActive).length;
    const inactive = this.userData.employees.length - active;

    this.employeeChartData = {
      labels: ['Active', 'Inactive'],
      datasets: [{
        data: [active, inactive],
        backgroundColor: ['#7a5af8', '#2a283b']
      }]
    };
  }

  setupBeneficiaryChart() {
    const bankMap: any = {};
    this.userData.beneficiaries.forEach((b: any) => {
      bankMap[b.bankName] = (bankMap[b.bankName] || 0) + 1;
    });

    this.beneficiaryChartData = {
      labels: Object.keys(bankMap),
      datasets: [{
        label: 'Number of Beneficiaries',
        data: Object.values(bankMap),
        backgroundColor: '#7a5af8'
      }]
    };
  }

  setupSalaryChart() {
    this.salaryChartData = {
      labels: this.userData.employees.map((e: any) => e.employeeName),
      datasets: [{
        label: 'Salary',
        data: this.userData.employees.map((e: any) => e.salary),
        backgroundColor: '#7a5af8'
      }]
    };
  }
}
