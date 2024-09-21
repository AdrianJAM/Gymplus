import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = true;
  activeTab = 'dashboard';

  attendanceData = [
    { name: 'Lun', value: 120 },
    { name: 'Mar', value: 150 },
    { name: 'Mié', value: 180 },
    { name: 'Jue', value: 140 },
    { name: 'Vie', value: 200 },
    { name: 'Sáb', value: 170 },
    { name: 'Dom', value: 90 },
  ];

  revenueData = [
    { name: 'Ene', value: 10000 },
    { name: 'Feb', value: 12000 },
    { name: 'Mar', value: 15000 },
    { name: 'Abr', value: 14000 },
    { name: 'May', value: 18000 },
    { name: 'Jun', value: 20000 },
  ];

  recentMembers = [
    { name: 'Ana García', plan: 'Premium', startDate: '01/05/2023', status: 'Activo' },
    { name: 'Juan Pérez', plan: 'Básico', startDate: '28/04/2023', status: 'Activo' },
    { name: 'María Rodríguez', plan: 'Estándar', startDate: '25/04/2023', status: 'Pendiente' },
  ];

  constructor() { }

  ngOnInit() {
    this.createAttendanceChart();
    this.createRevenueChart();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  createAttendanceChart() {
    const ctx = document.getElementById('attendanceChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.attendanceData.map(d => d.name),
        datasets: [{
          label: 'Asistencia',
          data: this.attendanceData.map(d => d.value),
          borderColor: '#22c55e',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createRevenueChart() {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.revenueData.map(d => d.name),
        datasets: [{
          label: 'Ingresos',
          data: this.revenueData.map(d => d.value),
          borderColor: '#3b82f6',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}