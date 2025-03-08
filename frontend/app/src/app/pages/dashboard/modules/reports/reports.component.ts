import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface MembershipStats {
  type: string;
  active: number;
  expired: number;
  revenue: number;
}

interface AttendanceData {
  date: string;
  count: number;
  peak_hour: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  membershipStats: MembershipStats[] = [
    { type: 'Monthly', active: 145, expired: 23, revenue: 7250 },
    { type: 'Quarterly', active: 89, expired: 12, revenue: 8010 },
    { type: 'Annual', active: 67, expired: 5, revenue: 20100 }
  ];

  attendanceData: AttendanceData[] = [
    { date: '2024-04-01', count: 78, peak_hour: '18:00' },
    { date: '2024-04-02', count: 92, peak_hour: '17:30' },
    { date: '2024-04-03', count: 85, peak_hour: '19:00' },
    { date: '2024-04-04', count: 95, peak_hour: '18:30' },
    { date: '2024-04-05', count: 105, peak_hour: '17:00' }
  ];

  displayedMembershipColumns: string[] = ['type', 'active', 'expired', 'revenue'];
  displayedAttendanceColumns: string[] = ['date', 'count', 'peak_hour'];

  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor() {}

  ngOnInit(): void {}

  generateReport(): void {
    console.log('Generating report for date range:', this.startDate, this.endDate);
  }
}
