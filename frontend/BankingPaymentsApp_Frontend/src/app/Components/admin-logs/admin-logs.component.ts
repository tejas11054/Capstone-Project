import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../Services/log.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.css']
})
export class AdminLogsComponent implements OnInit {
  logs: any[] = [];
  loading = true;
  pageNumber = 1;
  pageSize = 5;
  totalRecords = 0;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    this.loading = true;
    this.logService.getLogs(this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        this.logs = res.data;
        this.totalRecords = res.totalRecords;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching logs:', err);
        this.loading = false;
      }
    });
  }

  downloadLog(fileName: string): void {
    this.logService.downloadLog(fileName).subscribe({
      next: (blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      },
      error: (err) => {
        console.error('Download failed:', err);
      }
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > Math.ceil(this.totalRecords / this.pageSize)) return;
    this.pageNumber = page;
    this.fetchLogs();
  }
  // Add this inside the component class
get totalPages(): number {
  return Math.ceil(this.totalRecords / this.pageSize);
}

// Also for generating page numbers
get pages(): number[] {
  return Array(this.totalPages).fill(0).map((x, i) => i + 1);
}


}
