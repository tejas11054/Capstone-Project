import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-employee-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-upload.component.html',
  styleUrls: ['./employee-upload.component.css']
})
export class EmployeeUploadComponent {
  selectedFile: File | null = null;
  message: string = '';
  uploading: boolean = false;
  @Output() dataChanged = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService, private notify: NotificationService ) { }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.notify.error('Please select a CSV file first.');
      return;
    }

    this.uploading = true;
    this.employeeService.uploadEmployees(this.selectedFile).subscribe({
      next: (res: string) => {
        this.message = res;
        this.notify.warning(res); // 
        this.uploading = false;
        this.selectedFile = null;
        this.dataChanged.emit();
      },
      error: (err: any) => {
        console.error('Upload error:', err);
        this.message = 'Failed to upload employees.';
        this.notify.error('Failed to upload employees. Please check console.');
        this.uploading = false;
      }
    });
  }

}