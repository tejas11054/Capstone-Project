import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { roleGuard } from './Guards/role.guard';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { PaymentComponent } from './Components/payment/payment.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"dashboard",component:DashboardComponent,canActivate:[roleGuard],data:{role:"CLIENT_USER"}},
    {path:"payment",component:PaymentComponent,canActivate:[roleGuard],data:{role:"CLIENT_USER"}},
    {path:"**",component:PageNotFoundComponent}
];
