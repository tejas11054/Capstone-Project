import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientRegisterService } from '../../../Services/client.service';
import { EmployeeService } from '../../../Services/employee.service';
import { AuthService } from '../../../Services/auth.service';
import { NotificationService } from '../../../Services/notification.service';

@Component({
  selector: 'app-employee-upload',
  imports: [],
  templateUrl: './employee-upload.component.html',
  styleUrl: './employee-upload.component.css'
})
export class EmployeeUploadComponent implements OnInit {
  csvFile!: File;
  updateCSVFile!: File;
  userId!: number;
  @Output() dataChanged = new EventEmitter<void>();
  constructor(
    private route: ActivatedRoute,
    private clientSvc: ClientRegisterService,
    private auth: AuthService,
    private employeeSvc: EmployeeService,
    private router: Router,
    private notify: NotificationService 
  ) { }

  ngOnInit(): void {
    this.userId = this.auth.getUserId() ?? 0;
  }


  handleCSV(action: 'upload' | 'update') {
    if (!this.csvFile) return;

    if (action === 'upload') {
      this.uploadCSV();           // your existing upload logic
    } else if (action === 'update') {
      this.uploadUpdateCSVByClient();  // your existing update logic
    }

    // Reset input if needed
    // this.csvFile = null;
  }


  onCSVSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'text/csv') this.csvFile = file;
    else this.notify.error('Please select a valid CSV file.');
  }

  uploadCSV() {
    if (!this.csvFile) { this.notify.error('No CSV file selected.'); return; }

    this.employeeSvc.uploadEmployees(this.csvFile).subscribe({
      next: (res: any) => {
        // res contains InsertedCount, SkippedCount, SkippedDetails
        let msg = `Inserted: ${res.InsertedCount}\nSkipped: ${res.SkippedCount}`;
        if (res.SkippedDetails && res.SkippedDetails.length > 0) {
          msg += `\n\nSkipped Employees:\n${res.SkippedDetails.join('\n')}`;
        }
        this.notify.success("Upload Successful");
        this.dataChanged.emit();
      },
      error: (err) => {
        console.error(err);
        this.notify.error('Failed to upload CSV.');
      }
    });
  }


  onUpdateCSVFileSelect(event: any) {
    this.csvFile = event.target.files[0];
  }

  

  uploadUpdateCSVByClient() {
    if (!this.csvFile) { this.notify.error('No CSV file selected.'); return; }
    this.employeeSvc.uploadUpdateCSVByClient(this.csvFile, this.userId).subscribe({
      next: (res: string) => { this.notify.warning(res); this.dataChanged.emit()},
      error: (err) => { console.error(err); this.notify.error('Failed to update employees via CSV.'); }
    });
  }

}
