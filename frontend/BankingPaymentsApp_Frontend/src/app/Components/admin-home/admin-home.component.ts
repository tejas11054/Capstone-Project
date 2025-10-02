import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/User';
import { AuthService } from '../../Services/auth.service';
import { UserService } from '../../Services/user.service';
import { BankService } from '../../Services/bank.service';
import { Bank } from '../../Models/Bank';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ClientRegisterService } from '../../Services/client.service';
import { BankRegisterService } from '../../Services/bankUser.service';
import { ClientUser } from '../../Models/ClientUser';
import { BankUser } from '../../Models/BankUser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [NgChartsModule,RouterLink],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  admin!: User;
  banks!: Bank[];
  clients!: ClientUser[];
  bankUser!: BankUser[];
  logs!: any[];

  constructor(private auth: AuthService, private userSvc: UserService, private bankSvc: BankService, private clientSvc: ClientRegisterService, private bankUserSvc: BankRegisterService) { }

  ngOnInit(): void {
    let id = this.auth.getUserId() ?? 0;
    this.userSvc.getUserById(id).subscribe((data) => {
      console.log(data);
      this.admin = data;
    }, (error => {
      console.log(error);
    }))

    this.bankSvc.getAllBanks("").subscribe((data) => {
      console.log(data);
      this.banks = data;
    }, (error) => {
      console.log(error);
    })
    this.clientSvc.getClients("").subscribe((data) => {
      console.log(data);
      this.clients = data;
    }, (error) => {
      console.log(error);
    })
    this.bankUserSvc.getAllBankUsers("").subscribe((data) => {
      console.log(data);
      this.bankUser = data;
    }, (error) => {
      console.log(error);
    })

    this.loadUsersPerBank();
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

  usersPerBankChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Bank Users',
        data: [],
        backgroundColor: '#0d6efd'
      },
      {
        label: 'Client Users',
        data: [],
        backgroundColor: '#198754'
      }
    ]
  };

  loadUsersPerBank() {
    this.bankSvc.userPerBank().subscribe({
      next: (res) => {
        console.log("hello")
        console.log(res)

        // Prepare chart data
        this.usersPerBankChartData = {
          labels: res.map(b => b.bankName),
          datasets: [
            { label: 'Bank Users', data: res.map(b => b.bankUsers?.length || 0), backgroundColor: '#0d6efd' },
            { label: 'Client Users', data: res.map(b => b.clientUsers?.length || 0), backgroundColor: '#198754' }
          ]
        };
      },
      error: (err) => console.error(err)
    });
  }
}
