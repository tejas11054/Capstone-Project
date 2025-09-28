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

  user!: ClientUser | null;
  payments: Payment[] = [];

  filters: any = {};

  constructor(private auth: AuthService, private clientSvc: ClientRegisterService, private paymentSvc: PaymentService) { }

  ngOnInit(): void {
    const id = this.auth.getUserId() ?? 0;
    this.fetchUser(id);
  }

  fetchUser(id: number) {
    this.clientSvc.getClientById(id).subscribe((data) => {
      console.log(data);
      this.user = data;
      if (data != undefined || data != null) {
        this.filters.payerAccountId = data?.accountId;
        const params = new URLSearchParams(this.filters).toString();
        this.fetchPaymentsByClient(params);
      }
    }, (error) => {
      console.log(error);
    })
  }

  fetchPaymentsByClient(params: string) {
    this.paymentSvc.getAllPayments(params).subscribe((data) => {
      console.log(data);
      this.payments = data;

      this.paymentStatusChartData = {
      labels: ['Pending', 'Approved', 'Declined'],
      datasets: [{
        data: [
          this.getPendingPayments(),
          this.getApprovedPayments(),
          this.getDeclinedPayments()
        ]
      }]
    };
    }, (error) => {
      console.log(error);
    })
  }
  paymentStatusChartData!:ChartData<'doughnut', number[], string>;
  // paymentStatusChartData: ChartData<'doughnut', number[], string> = {
  //   labels: ['Pending', 'Approved', 'Declined'],
  //   datasets: [{ data: [this.getPendingPayments(), this.getApprovedPayments(), this.getDeclinedPayments()] }]
  // };

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







  public chartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { data: [10, 20, 30, 40, 50], label: 'Revenue' }
    ]
  };

  public chartOptions: ChartOptions<'doughnut' | 'line'> = {
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

  public chartType: 'bar' = 'bar';
}
