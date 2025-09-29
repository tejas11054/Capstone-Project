import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Standalone components
import { RegistrationSidebarComponent } from '../registration-sidebar/registration-sidebar.component';
import { ClientRegisterComponent } from '../../client-register/client-register.component';
import { DocumentUploadComponent } from '../../document-upload/document-upload.component';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [
    CommonModule,
    RegistrationSidebarComponent,
    ClientRegisterComponent,
    DocumentUploadComponent
  ],
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {
  currentStep = 1;

  goToStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < 2) this.currentStep++;
  }

  previousStep() {
    if (this.currentStep > 1) this.currentStep--;
  }
}
