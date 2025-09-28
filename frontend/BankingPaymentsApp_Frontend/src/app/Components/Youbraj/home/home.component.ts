import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { User } from '../../../Models/User';
import { AuthService } from '../../../Services/auth.service';
import { ClientRegisterService } from '../../../Services/client.service';
import { ClientUser } from '../../../Models/ClientUser';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../Services/payment.service';
import { Payment } from '../../../Models/Payment';

@Component({
  selector: 'app-home',
  imports: [NgChartsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  user!: any;
  totalBalance!: number;
  payments: Payment[] = [];
  activeEmployees!:number;

  filters: any = {};

  constructor(private auth: AuthService, private clientSvc: ClientRegisterService, private paymentSvc: PaymentService) { }

  ngOnInit(): void {
    const id = this.auth.getUserId();

    this.fetchUser(id ?? 0)
  }

  fetchUser(id: number) {
    this.clientSvc.getClientById(id).subscribe((data) => {
      console.log(data);
      this.user = data;
      if (data != undefined || data != null) {
        this.filters.payerAccountId = data?.accountId;
        const params = new URLSearchParams(this.filters).toString();
        this.fetchPaymentsByClient(params);

        this.setupEmployeeChart();
        this.setupBeneficiaryChart();
        this.setupSalaryChart();
        
      }
    }, (error) => {
      console.log(error);
    })
  }

  fetchPaymentsByClient(params: string) {
    this.paymentSvc.getAllPayments(params).subscribe((data) => {
      console.log(data);
      this.payments = data;
      this.setupPaymentChart();

    }, (error) => {
      console.log(error);
    })
  }

  recentTxnChartData: ChartData<'line', number[], string> = {
    labels: ['Mon', 'Tue', 'Wed'],
    datasets: [{ data: [1000, 2000, 1500] }]
  };

  getApprovedPayments() {
    return this.payments.filter(p => p.paymentStatusId === 1).length;
  }

  getDeclinedPayments() {
    return this.payments.filter(p => p.paymentStatusId === 2).length;
  }
  getPendingPayments() {
    return this.payments.filter(p => p.paymentStatusId === 3).length;
  }

  public chartOptions: ChartOptions<'doughnut' | 'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false, // allows canvas to fit the container
    plugins: {
      legend: {
        position: 'top', // or 'bottom'
        labels: {
          boxWidth: 12,
          padding: 10
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    layout: {
      padding: 20 // optional, adds space inside the chart
    },
    scales: {
      x: { display: true },
      y: { display: true }
    }
  };

  paymentStatusChartData!: ChartData<'doughnut'>;
  paymentStatusChartOptions: ChartOptions<'doughnut'> = { responsive: true };
  paymentStatusChartType = 'doughnut' as const;

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



  setupEmployeeChart() {
    const active = this.user.employees.filter((e: any) => e.isActive).length;
    this.activeEmployees = this.user.employees.filter((e: any) => e.isActive).length;
    const inactive = this.user.employees.length - active;

    this.employeeChartData = {
      labels: ['Active', 'Inactive'],
      datasets: [{
        data: [active, inactive],
        backgroundColor: ['#7a5af8', '#2a283b']
      }]
    };
  }
  setupPaymentChart() {
    const approved = this.payments.filter(p => p.paymentStatusId === 1).length;
    const declined = this.payments.filter(p => p.paymentStatusId === 2).length;
    const pending = this.payments.filter(p => p.paymentStatusId === 3).length;

    this.paymentStatusChartData = {
      labels: ['approved', 'declined', 'pending'],
      datasets: [{
        data: [approved, declined, pending],
        backgroundColor: ['#7a5af8', '#4fd0e7ff', '#0c0833ff']
      }]
    };
  }

  setupBeneficiaryChart() {
    const bankMap: any = {};
    this.user.beneficiaries.forEach((b: any) => {
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
      labels: this.user.employees.map((e: any) => e.employeeName),
      datasets: [{
        label: 'Salary',
        data: this.user.employees.map((e: any) => e.salary),
        backgroundColor: '#7a5af8'
      }]
    };
  }
}
