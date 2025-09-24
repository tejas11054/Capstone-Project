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
import { AdminComponent } from './Components/admin/admin.component';
import { ListPaymentComponent } from './Components/list-payment/list-payment.component';
import { ClientUserComponent } from './Components/client-user/client-user.component';
import { EmployeeUploadComponent } from './Components/employee-upload/employee-upload.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: "Login", component: LoginComponent },
    { path: "dashboard", component: DashboardComponent, canActivate: [roleGuard], data: { role: "CLIENT_USER" } },
    { path: "ClientRegister", component: ClientRegisterComponent },
    { path: "ClientUser", component: ClientUserComponent },
    { path: 'DocumentUpload/:userId', component: DocumentUploadComponent },
    { path: 'BankUser', component: BankUserComponent },
    { path: "BankRegister", component: BankRegisterComponent },
    { path: 'Admin', component: AdminComponent },
    { path: "pendingPayment", component: ListPaymentComponent },
    { path: "payment", component: PaymentComponent },
    { path: "EmployeeUpload", component: EmployeeUploadComponent },
    { path: "**", component: PageNotFoundComponent },
];
