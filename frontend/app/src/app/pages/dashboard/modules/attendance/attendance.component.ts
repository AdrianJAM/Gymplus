import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AttendanceRecord {
  id: number;
  memberId: number;
  memberName: string;
  memberPhoto?: string;
  checkIn: string;
  checkOut: string;
  duration: string;
}

interface Member {
  id: number;
  name: string;
  photo?: string;
  isActive: boolean;
  lastAttendance?: string;
  membershipType?: string;
  frequency?: 'Alta' | 'Media' | 'Baja';
  attendanceCount?: number;
  lastAttendanceDate?: string;
  lastAttendanceTime?: string;
  lastAttendanceDays?: number;
}

interface WeekdayAttendance {
  day: string;
  count: number;
}

interface HourlyAttendance {
  hour: string;
  count: number;
}

interface MonthlyAttendance {
  month: string;
  count: number;
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  // Datos para las tarjetas de estadísticas
  attendanceToday: number = 32;
  attendancePercentage: number = 20;
  activeMembers: number = 5;
  activeMembersPercentage: number = 7;
  peakHourStart: string = '18:00';
  peakHourEnd: string = '20:00';
  peakHourCount: number = 25;
  inactiveMembers: number = 8;
  inactiveDays: number = 14;

  // Fecha actual y filtros
  currentDate: Date = new Date();
  searchTerm: string = '';
  selectedTab: 'records' | 'members' | 'statistics' = 'records';
  
  // Registros de asistencia
  attendanceRecords: AttendanceRecord[] = [
    {
      id: 1,
      memberId: 1,
      memberName: 'Miguel Rodríguez',
      checkIn: '10/03/2025 20:58',
      checkOut: '10/03/2025 22:38',
      duration: '1h 40min'
    },
    {
      id: 2,
      memberId: 2,
      memberName: 'Juan Pérez',
      checkIn: '10/03/2025 20:54',
      checkOut: '10/03/2025 21:25',
      duration: '31 min'
    },
    {
      id: 3,
      memberId: 3,
      memberName: 'María López',
      checkIn: '10/03/2025 20:42',
      checkOut: '10/03/2025 22:39',
      duration: '1h 57min'
    },
    {
      id: 4,
      memberId: 4,
      memberName: 'Carlos Sánchez',
      checkIn: '10/03/2025 20:32',
      checkOut: '10/03/2025 21:07',
      duration: '35 min'
    }
  ];

  // Miembros
  members: Member[] = [
    { 
      id: 1, 
      name: 'Juan Pérez', 
      isActive: true,
      membershipType: 'Mensual',
      frequency: 'Alta',
      attendanceCount: 18,
      lastAttendanceDate: '10/03/2024',
      lastAttendanceTime: '18:30',
      lastAttendanceDays: 1
    },
    { 
      id: 2, 
      name: 'Ana García', 
      isActive: true,
      membershipType: 'Trimestral',
      frequency: 'Media',
      attendanceCount: 12,
      lastAttendanceDate: '09/03/2024',
      lastAttendanceTime: '10:15',
      lastAttendanceDays: 2
    },
    { 
      id: 3, 
      name: 'Miguel Rodríguez', 
      isActive: true,
      membershipType: 'Anual',
      frequency: 'Alta',
      attendanceCount: 22,
      lastAttendanceDate: '10/03/2024',
      lastAttendanceTime: '07:45',
      lastAttendanceDays: 1
    },
    { 
      id: 4, 
      name: 'Sofía Martínez', 
      isActive: true,
      membershipType: 'Mensual',
      frequency: 'Media',
      attendanceCount: 10,
      lastAttendanceDate: '08/03/2024',
      lastAttendanceTime: '17:30',
      lastAttendanceDays: 3
    },
    { 
      id: 5, 
      name: 'Carlos Sánchez', 
      isActive: true,
      membershipType: 'Semestral',
      frequency: 'Baja',
      attendanceCount: 5,
      lastAttendanceDate: '05/03/2024',
      lastAttendanceTime: '19:00',
      lastAttendanceDays: 6
    },
    { id: 6, name: 'Roberto Fernández', isActive: false, lastAttendance: '25/02/2025' },
    { id: 7, name: 'Laura Martínez', isActive: false, lastAttendance: '27/02/2025' },
    { id: 8, name: 'Pedro González', isActive: false, lastAttendance: '01/03/2025' }
  ];

  // Datos para estadísticas
  weekdayAttendance: WeekdayAttendance[] = [
    { day: 'Lunes', count: 45 },
    { day: 'Martes', count: 38 },
    { day: 'Miércoles', count: 42 },
    { day: 'Jueves', count: 40 },
    { day: 'Viernes', count: 35 },
    { day: 'Sábado', count: 28 },
    { day: 'Domingo', count: 15 }
  ];

  hourlyAttendance: HourlyAttendance[] = [
    { hour: '6:00', count: 12 },
    { hour: '8:00', count: 18 },
    { hour: '10:00', count: 15 },
    { hour: '12:00', count: 10 },
    { hour: '14:00', count: 8 },
    { hour: '16:00', count: 14 },
    { hour: '18:00', count: 25 },
    { hour: '20:00', count: 20 },
    { hour: '22:00', count: 5 }
  ];

  monthlyAttendance: MonthlyAttendance[] = [
    { month: 'Enero', count: 720 },
    { month: 'Febrero', count: 680 },
    { month: 'Marzo', count: 750 }
  ];

  // Estadísticas adicionales
  averageDuration: number = 75;
  durationIncrease: number = 5;
  retentionRate: number = 78;
  atRiskPercentage: number = 12;

  constructor() { }

  ngOnInit(): void {
    // Inicialización del componente
  }

  // Cambiar pestaña activa
  setActiveTab(tab: 'records' | 'members' | 'statistics'): void {
    this.selectedTab = tab;
  }

  // Registrar entrada de un miembro
  registerCheckIn(): void {
    console.log('Registrar entrada');
    // Aquí iría la lógica para registrar la entrada de un miembro
  }

  // Registrar salida de un miembro
  registerCheckOut(): void {
    console.log('Registrar salida');
    // Aquí iría la lógica para registrar la salida de un miembro
  }

  // Ver historial de un miembro
  viewHistory(memberId: number): void {
    console.log(`Ver historial del miembro con ID: ${memberId}`);
    // Aquí iría la lógica para mostrar el historial de asistencia de un miembro
  }

  // Registrar asistencia de un miembro
  registerAttendance(memberId: number): void {
    console.log(`Registrar asistencia del miembro con ID: ${memberId}`);
    // Aquí iría la lógica para registrar la asistencia de un miembro
  }

  // Exportar registros
  exportRecords(): void {
    console.log('Exportar registros');
    // Aquí iría la lógica para exportar los registros de asistencia
  }

  // Cambiar fecha
  changeDate(direction: 'prev' | 'next'): void {
    const newDate = new Date(this.currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    this.currentDate = newDate;
    console.log(`Fecha cambiada a: ${this.formatDate(this.currentDate)}`);
    // Aquí iría la lógica para cargar los registros de la nueva fecha
  }

  // Formatear fecha como DD de mes de YYYY
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
  }

  // Filtrar registros por término de búsqueda
  filterRecords(): AttendanceRecord[] {
    if (!this.searchTerm.trim()) {
      return this.attendanceRecords;
    }
    
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.attendanceRecords.filter(record => 
      record.memberName.toLowerCase().includes(searchTermLower)
    );
  }

  // Filtrar miembros por término de búsqueda
  filterMembers(): Member[] {
    if (!this.searchTerm.trim()) {
      return this.members.filter(member => member.isActive);
    }
    
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.members.filter(member => 
      member.isActive && member.name.toLowerCase().includes(searchTermLower)
    );
  }

  // Obtener clase de frecuencia
  getFrequencyClass(frequency: string | undefined): string {
    switch (frequency) {
      case 'Alta':
        return 'frequency-high';
      case 'Media':
        return 'frequency-medium';
      case 'Baja':
        return 'frequency-low';
      default:
        return '';
    }
  }
}
