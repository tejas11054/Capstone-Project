import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ClientRegisterComponent } from './Components/client-register/client-register.component';
import { DocumentUploadComponent } from './Components/document-upload/document-upload.component';
import { BankUserComponent } from './Components/bank-user/bank-user.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { roleGuard } from './Guards/role.guard';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { BankRegisterComponent } from './Components/bank-register/bank-register.component';
import { AdminComponent } from './Components/admin-bankuser/admin-bankuser.component';
import { ListPaymentComponent } from './Components/list-payment/list-payment.component';
import { ClientUserComponent } from './Components/client-user/client-user.component';
import { EmployeeUploadComponent } from './Components/employee-upload/employee-upload.component';
import { ListAllEmployeesComponent } from './Components/list-all-employees/list-all-employees.component';
import { SalaryDisbursementComponent } from './Components/salary-disbursement/salary-disbursement.component';
import { ListSalaryDisbursementComponent } from './Components/list-salary-disbursement/list-salary-disbursement.component';
import { ClientProfileComponent } from './Components/client-profile/client-profile.component';
import { ClientDocumentsComponent } from './Components/client-document/client-document.component';
import { ClientAccountComponent } from './Components/client-account/client-account.component';
import { BeneficiariesComponent } from './Components/beneficiary/beneficiary.component';
import { BeneficiaryRegisterComponent } from './Components/beneficiary-register/beneficiary-register.component';
import { EmployeesComponent } from './Components/employee-list/employee-list.component';
import { ClientTransactionComponent } from './Components/client-transaction/client-transaction.component';
import { ClientPaymentComponent } from './Components/client-payment/client-payment.component';
import { ClientSalaryDisbursementComponent } from './Components/client-salary-disbursement/client-salary-disbursement.component';
import { BeneficiaryComponent } from './Components/Youbraj/beneficiary/beneficiary.component';
import { CreateBeneficiaryComponent } from './Components/Youbraj/create-beneficiary/create-beneficiary.component';
import { EmployeeComponent } from './Components/Youbraj/employee/employee.component';
import { DisbursementComponent } from './Components/Youbraj/disbursement/disbursement.component';
import { DisbursementDetailsComponent } from './Components/Youbraj/disbursement-details/disbursement-details.component';
import { TransactionComponent } from './Components/Youbraj/transaction/transaction.component';
import { HomeComponent } from './Components/Youbraj/home/home.component';
import { ClientHomeComponent } from './Components/client-home/client-home.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AdminViewBankComponent } from './Components/admin-view-bank/admin-view-bank.component';
import { AdminHomeComponent } from './Components/admin-home/admin-home.component';
import { AdminLogsComponent } from './Components/admin-logs/admin-logs.component';

export const routes: Routes = [
     {
    path: 'ClientUser/:id',
    component: ClientUserComponent, // dashboard parent
    children: [
      { path: '', pathMatch: 'full', redirectTo: '' },
      { path: 'home', pathMatch: 'full', component: ClientHomeComponent },
      { path: 'profile/:id', component: ClientProfileComponent },
      { path: 'ClientAccount/:id', component: ClientAccountComponent },
      { path: 'ClientDocuments/:userId', component: ClientDocumentsComponent },
      { path: 'beneficiaries', component: BeneficiariesComponent, children: [
        { path: 'add', component: BeneficiaryRegisterComponent }
      ]},

      { path: 'ClientUser/:userId/transactions', component: ClientTransactionComponent },
      { path: 'ClientEmployees/:userId', component: EmployeesComponent },
      { path: 'ClientPayments/:clientId', component: ClientPaymentComponent },
      { path: 'ClientSalaryDisbursement/:userId', component: ClientSalaryDisbursementComponent},
    ]
  },

  { path: 'AdminDashboard', 
    component: AdminDashboardComponent,
    children: [
      { path: "BankRegister", component: BankRegisterComponent },
      { path: 'AdminBankUsers', component: AdminComponent },
      { path: 'AdminViewBanks', component: AdminViewBankComponent},
      { path: 'AdminHome', component: AdminHomeComponent},
      { path: 'AdminLogs', component: AdminLogsComponent},
    ]
  },
    { path: '', component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "dashboard", component: DashboardComponent, canActivate: [roleGuard], data: { role: "CLIENT_USER" } },
    { path: "ClientRegister", component: ClientRegisterComponent },
    { path: 'ClientUser/:id', component: ClientUserComponent },
    {path:"beneficiary",component:BeneficiaryComponent},
    {path:"beneficiary/create",component:CreateBeneficiaryComponent},
    {path:"employee",component:ListAllEmployeesComponent},
    {path:"disbursements",component:DisbursementComponent},
    {path:"disbursements/:id",component:DisbursementDetailsComponent},
    {path:"transactions",component:TransactionComponent},
    {path:"home",component:HomeComponent},
    
    
    { path: 'DocumentUpload/:userId', component: DocumentUploadComponent },
    
    { path: "ClientUser/:clientId/payments", component: ClientAccountComponent},
    
    { path: 'BankUser', component: BankUserComponent },
    
    
    { path: "pendingPayment", component: ListPaymentComponent },
    { path: "payment", component: PaymentComponent },
    { path: "EmployeeUpload", component: EmployeeUploadComponent },
    { path: "employees", component: ListAllEmployeesComponent },
    { path: "salary", component: SalaryDisbursementComponent },
    { path: "disbursement", component: SalaryDisbursementComponent },
    { path: "BeneficiaryRegister", component: BeneficiaryRegisterComponent},
    { path: "disbursement", component: ListSalaryDisbursementComponent },
    { path: "**", component: PageNotFoundComponent },
];
