import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-registration-sidebar',
  imports: [CommonModule],
  templateUrl: './registration-sidebar.component.html',
  styleUrl: './registration-sidebar.component.css'
})
export class RegistrationSidebarComponent {
@Input() currentStep!: number;
}
