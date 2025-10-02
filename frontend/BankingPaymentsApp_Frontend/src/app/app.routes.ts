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
import { ProfileComponent } from './Components/Youbraj/profile/profile.component';
import { ListClientsComponent } from './Components/Youbraj/list-clients/list-clients.component';
import { ViewDocumentsComponent } from './Components/Youbraj/view-documents/view-documents.component';
import { BankUserHomeComponent } from './Components/Youbraj/bank-user-home/bank-user-home.component';
import { BankUserProfileComponent } from './Components/Youbraj/bank-user-profile/bank-user-profile.component';
import { authGuard } from './Guards/auth.guard';
import { ClientCreateComponent } from './Components/Youbraj/client-create/client-create.component';
import { CallToAction } from './Components/landing-page/call-to-action/call-to-action';
import { BankUserRegisterComponent } from './Components/bank-user-register/bank-user-register.component';
import { MainComponent } from './Components/landing-page/main/main.component';


export const routes: Routes = [

  { path: '', redirectTo: 'Landing', pathMatch: 'full' },
  // {
  //   path: 'ClientUser/:id',
  //   component: ClientUserComponent, // dashboard parent
  //   children: [
  //     { path: '', pathMatch: 'full', redirectTo: '' },
  //     { path: 'home', pathMatch: 'full', component: ClientHomeComponent },
  //     { path: 'profile/:id', component: ClientProfileComponent },
  //     { path: 'ClientAccount/:id', component: ClientAccountComponent },
  //     { path: 'ClientDocuments/:userId', component: ClientDocumentsComponent },
  //     {
  //       path: 'beneficiaries', component: BeneficiariesComponent, children: [
  //         { path: 'add', component: BeneficiaryRegisterComponent }
  //       ]
  //     },

  //     { path: 'ClientUser/:userId/transactions', component: ClientTransactionComponent },
  //     { path: 'ClientEmployees/:userId', component: EmployeesComponent },
  //     { path: 'ClientPayments/:clientId', component: ClientPaymentComponent },
  //     { path: 'ClientSalaryDisbursement/:userId', component: ClientSalaryDisbursementComponent },
  //   ]
  // },


  // { path: "bankRegister", component: BankRegisterComponent },

  // {
  //   path: 'AdminDashboard',
  //   component: AdminDashboardComponent,
  //   children: [
  //     { path: "BankRegister", component: BankRegisterComponent },
  //     { path: 'AdminBankUsers', component: AdminComponent },
  //     { path: 'AdminViewBanks', component: AdminViewBankComponent },
  //     { path: 'AdminHome', component: AdminHomeComponent },
  //     { path: 'AdminLogs', component: AdminLogsComponent },
  //   ]
  // },
  // { path: '', component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [roleGuard], data: { role: "CLIENT_USER" } },
  { path: "ClientRegister", component: ClientRegisterComponent },
  { path: 'ClientUser/:id', component: ClientUserComponent },
  { path: "beneficiary", component: BeneficiaryComponent },
  { path: "beneficiary/create", component: CreateBeneficiaryComponent },
  { path: "employee", component: ListAllEmployeesComponent },
  { path: "disbursements", component: DisbursementComponent },
  { path: "disbursements/:id", component: DisbursementDetailsComponent },
  { path: "transactions", component: TransactionComponent },
  { path: "home", component: HomeComponent, canActivate: [authGuard], data: { role: "CLIENT_USER" } },
  { path: "profile", component: ProfileComponent },
  { path: "document/upload", component: DocumentUploadComponent },
  { path: "profile/edit", component: ClientProfileComponent },
  { path: "clients", component: ListClientsComponent },
  { path: "clients/documents/:id", component: ViewDocumentsComponent },
  { path: "BankUserHome", component: BankUserHomeComponent },
  { path: "BankUserProfile", component: BankUserProfileComponent },
  { path: "clientRegister", component: ClientCreateComponent },
  { path: "DocumentUpload", component: DocumentUploadComponent },
  { path: "bankusers", component: AdminComponent },
  { path: "logs", component: AdminLogsComponent },
  { path: "adminHome", component: AdminHomeComponent },
  { path: "bank", component: BankRegisterComponent },
  { path: "banks", component: AdminViewBankComponent },



  { path: "Landing", component: MainComponent },
  // { path: 'DocumentUpload/:userId', component: DocumentUploadComponent },

  { path: "ClientUser/:clientId/payments", component: ClientAccountComponent },

  { path: 'BankUser', component: BankUserComponent },
  { path: 'BankUserRegistration', component: BankUserRegisterComponent },


  { path: "payments", component: ListPaymentComponent },
  { path: "payment", component: PaymentComponent },
  { path: "EmployeeUpload", component: EmployeeUploadComponent },
  { path: "employees", component: ListAllEmployeesComponent },
  { path: "salary", component: SalaryDisbursementComponent },
  { path: "disbursement", component: SalaryDisbursementComponent },
  { path: "BeneficiaryRegister", component: BeneficiaryRegisterComponent },
  { path: "disbursement", component: ListSalaryDisbursementComponent },

  { path: "**", component: PageNotFoundComponent },
];
