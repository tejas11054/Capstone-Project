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

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    this.loading = true;
    this.logService.getLogs().subscribe({
      next: (res) => {
        this.logs = res;
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
}
