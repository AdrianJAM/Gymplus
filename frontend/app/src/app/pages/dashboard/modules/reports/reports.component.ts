import { Component, OnInit, HostListener } from '@angular/core';
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

interface EquipmentUsage {
  name: string;
  usage: number;
}

interface RevenueBreakdown {
  category: string;
  percentage: number;
  amount: number;
}

interface PopularClass {
  name: string;
  attendance: number;
}

interface ClassOccupancy {
  name: string;
  occupancy: number;
}

interface IncomeVsExpenses {
  category: string;
  income: number;
  expense: number;
}

interface IncomeSource {
  source: string;
  amount: number;
  percentage: number;
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
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  membershipStats: MembershipStats[] = [
    { type: 'Mensual', active: 145, expired: 23, revenue: 7250 },
    { type: 'Trimestral', active: 89, expired: 12, revenue: 8010 },
    { type: 'Anual', active: 67, expired: 5, revenue: 20100 }
  ];
  attendanceData: AttendanceData[] = [
    { date: '2024-04-01', count: 78, peak_hour: '18:00' },
    { date: '2024-04-02', count: 92, peak_hour: '17:30' },
    { date: '2024-04-03', count: 85, peak_hour: '19:00' },
    { date: '2024-04-04', count: 95, peak_hour: '18:30' },
    { date: '2024-04-05', count: 105, peak_hour: '17:00' }
  ];
  equipmentUsage: EquipmentUsage[] = [
    { name: 'Caminadoras', usage: 87 },
    { name: 'Press de Banca', usage: 76 },
    { name: 'Racks de Sentadilla', usage: 82 },
    { name: 'Elípticas', usage: 65 }
  ];
  revenueBreakdown: RevenueBreakdown[] = [
    { category: 'Membresías', percentage: 75, amount: 26520 },
    { category: 'Entrenamiento Personal', percentage: 15, amount: 5304 },
    { category: 'Suplementos', percentage: 7, amount: 2475 },
    { category: 'Ropa Deportiva', percentage: 3, amount: 1061 }
  ];
  displayedMembershipColumns: string[] = ['type', 'active', 'expired', 'revenue'];
  displayedAttendanceColumns: string[] = ['date', 'count', 'peak_hour'];
  startDate: Date = new Date();
  endDate: Date = new Date();
  activeTab: string = 'general';

  // Datos para las pestañas
  popularClasses: PopularClass[] = [
    { name: 'Spinning', attendance: 85 },
    { name: 'Yoga', attendance: 75 },
    { name: 'CrossFit', attendance: 90 },
    { name: 'Pilates', attendance: 65 }
  ];

  classOccupancy: ClassOccupancy[] = [
    { name: 'Spinning', occupancy: 95 },
    { name: 'Yoga', occupancy: 80 },
    { name: 'CrossFit', occupancy: 85 },
    { name: 'Pilates', occupancy: 70 }
  ];

  incomeVsExpenses: IncomeVsExpenses[] = [
    { category: 'Enero', income: 75, expense: 12500 },
    { category: 'Febrero', income: 80, expense: 13200 },
    { category: 'Marzo', income: 85, expense: 14000 },
    { category: 'Abril', income: 78, expense: 13000 }
  ];

  incomeSources: IncomeSource[] = [
    { source: 'Membresías', amount: 8500, percentage: 70 },
    { source: 'Clases privadas', amount: 2500, percentage: 20 },
    { source: 'Venta de productos', amount: 1200, percentage: 10 }
  ];

  // Variables para el menú de exportación
  showExportMenu = false;

  toggleExportMenu(): void {
    this.showExportMenu = !this.showExportMenu;
  }

  exportReport(format: 'pdf' | 'excel'): void {
    switch (format) {
      case 'pdf':
        console.log('Exportando en PDF...');
        // Aquí irá la lógica para exportar en PDF
        break;
      case 'excel':
        console.log('Exportando en Excel...');
        // Aquí irá la lógica para exportar en Excel
        break;
    }
    this.showExportMenu = false; // Cerrar el menú después de exportar
  }

  // Cerrar el menú cuando se hace clic fuera de él
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const exportButton = document.querySelector('.toolbar-button.export');
    const exportMenu = document.querySelector('.export-menu');
    
    if (!exportButton?.contains(event.target as Node) && 
        !exportMenu?.contains(event.target as Node)) {
      this.showExportMenu = false;
    }
  }

  constructor() {}

  ngOnInit(): void {
    const today = new Date();
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }

  formatDate(date: Date): string {
    if (!date) {
      return '';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onStartDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.startDate = new Date(input.value);
    }
  }

  onEndDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.endDate = new Date(input.value);
    }
  }

  generateReport(): void {
    console.log('Generating report for the period:', this.startDate, this.endDate);
    // Implement logic to filter reports based on startDate and endDate
    const filteredAttendanceData = this.attendanceData.filter(data => {
      const date = new Date(data.date);
      return date >= this.startDate && date <= this.endDate;
    });
    console.log('Filtered attendance data:', filteredAttendanceData);
  }

  exportToPDF(): void {
    console.log('Exporting to PDF...');
    // Implement PDF export logic
  }

  exportToExcel(): void {
    console.log('Exporting to Excel...');
    // Implement Excel export logic
  }
}
