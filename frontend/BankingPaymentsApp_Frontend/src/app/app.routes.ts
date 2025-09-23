import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ClientRegisterComponent } from './Components/client-register/client-register.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { BankUserComponent } from './Components/bank-user/bank-user.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { roleGuard } from './Guards/role.guard';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { PaymentComponent } from './Components/payment/payment.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"dashboard",component:DashboardComponent,canActivate:[roleGuard],data:{role:"CLIENT_USER"}},
    { path:"ClientRegister", component : ClientRegisterComponent },
    { path: 'DocumentUpload/:userId', component: DocumentUploadComponent },
    { path: 'BankUser', component: BankUserComponent },
    {path:"**",component:PageNotFoundComponent},
];
