import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../Services/log.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DateFilterComponent } from '../Filters/date-filter/date-filter.component';

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [CommonModule, FormsModule, DateFilterComponent],
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.css']
})
export class AdminLogsComponent implements OnInit {
  logs: any[] = [];
  allLogs: any[] = []; // Keep the original list
  loading = true;
  pageNumber = 1;
  pageSize = 5;
  totalRecords = 0;

  constructor(private logService: LogService) { }

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
    this.logService.downloadLog(fileName).subscribe(
      {
        next: (blob) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName; link.click();
        },
        error: (err) => {
          console.error('Download failed:', err);
        }
      });
  }

  onDateFilter(dates: { dateFrom: string; dateTo: string }) {
    if (!dates.dateFrom && !dates.dateTo) {
      // Reset filter if both dates are empty
      this.logs = [...this.allLogs];
      return;
    }

    const createdFrom = dates.dateFrom ? new Date(dates.dateFrom) : null;
    const createdTo = dates.dateTo ? new Date(dates.dateTo) : null;

    this.logs = this.allLogs.filter(l => {
      const createdDate = new Date(l.createdOn);
      if (createdFrom && createdTo) {
        return createdDate >= createdFrom && createdDate <= createdTo;
      } else if (createdFrom) {
        return createdDate >= createdFrom;
      } else if (createdTo) {
        return createdDate <= createdTo;
      }
      return true;
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
