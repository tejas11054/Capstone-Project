import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ClientRegisterComponent } from './Components/client-register/client-register.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { BankUserComponent } from './Components/bank-user/bank-user.component';

export const routes: Routes = [
    { path:"Login", component : LoginComponent },
    { path:"ClientRegister", component : ClientRegisterComponent },
    { path: 'DocumentUpload/:userId', component: DocumentUploadComponent },
    { path: 'BankUser', component: BankUserComponent }

];
