import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Instructor {
  id: string;
  name: string;
  specialties: string[];
  availability: string;
  classes: number;
  image?: string;
}

interface Room {
  id: string;
  name: string;
  capacity: number;
  equipment: string;
  scheduledClasses: number;
}

interface Class {
  id: string;
  name: string;
  instructor: string;
  instructorId: string;
  room: string;
  roomId: string;
  day: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolled: number;
  occupancy?: number; // Calculado como porcentaje
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'] // Corregido 'styleUrl' a 'styleUrls'
})
export class ScheduleComponent implements OnInit {
  // UI State
  currentView: 'monthly' | 'weekly' | 'daily' | 'classes' | 'instructors' | 'rooms' = 'classes';
  currentMonth = 'marzo';
  currentYear = 2025;
  showAddClassModal = false;
  showClassDetailsModal = false;
  searchQuery = '';
  selectedClass: Class | null = null;
  selectedDate = new Date();
  
  // Form
  classForm: FormGroup;
  
  // Data for daily and weekly views
  hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  currentWeekStart = new Date();
  currentWeekEnd = new Date();
  weekDates: number[] = [];
  weekDays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  
  // Data
  instructors: Instructor[] = [
    {
      id: '1',
      name: 'Ana Martínez',
      specialties: ['Spinning', 'Cardio'],
      availability: 'Lunes a Sábado',
      classes: 4
    },
    {
      id: '2',
      name: 'Carlos López',
      specialties: ['Yoga', 'Pilates'],
      availability: 'Lunes a Viernes',
      classes: 4
    },
    {
      id: '3',
      name: 'Roberto Sánchez',
      specialties: ['Crossfit', 'HIIT', 'Funcional'],
      availability: 'Lunes a Sábado',
      classes: 6
    },
    {
      id: '4',
      name: 'María González',
      specialties: ['Zumba', 'Baile'],
      availability: 'Lunes a Viernes',
      classes: 3
    },
    {
      id: '5',
      name: 'Laura Fernández',
      specialties: ['Pilates', 'Yoga'],
      availability: 'Martes a Sábado',
      classes: 5
    }
  ];
  
  rooms: Room[] = [
    {
      id: '1',
      name: 'Sala de Spinning',
      capacity: 15,
      equipment: 'Bicicletas estáticas',
      scheduledClasses: 4
    },
    {
      id: '2',
      name: 'Sala de Clases 1',
      capacity: 20,
      equipment: 'Colchonetas, pelotas, steps',
      scheduledClasses: 6
    },
    {
      id: '3',
      name: 'Sala de Clases 2',
      capacity: 25,
      equipment: 'Colchonetas, steps, pesas ligeras',
      scheduledClasses: 4
    },
    {
      id: '4',
      name: 'Área Funcional',
      capacity: 15,
      equipment: 'Equipamiento funcional, TRX, kettlebells',
      scheduledClasses: 5
    },
    {
      id: '5',
      name: 'Sala de Pesas',
      capacity: 15,
      equipment: 'Pesas, máquinas, bancos',
      scheduledClasses: 3
    }
  ];
  
  classes: Class[] = [
    {
      id: '1',
      name: 'Spinning',
      instructor: 'Ana Martínez',
      instructorId: '1',
      room: 'Sala de Spinning',
      roomId: '1',
      day: 'Lunes',
      startTime: '08:00',
      endTime: '09:00',
      capacity: 15,
      enrolled: 12,
      occupancy: 80
    },
    {
      id: '2',
      name: 'Yoga',
      instructor: 'Carlos López',
      instructorId: '2',
      room: 'Sala de Clases 1',
      roomId: '2',
      day: 'Lunes',
      startTime: '10:00',
      endTime: '11:30',
      capacity: 20,
      enrolled: 15,
      occupancy: 75
    },
    {
      id: '3',
      name: 'Crossfit',
      instructor: 'Roberto Sánchez',
      instructorId: '3',
      room: 'Área Funcional',
      roomId: '4',
      day: 'Lunes',
      startTime: '18:00',
      endTime: '19:00',
      capacity: 12,
      enrolled: 10,
      occupancy: 83
    },
    {
      id: '4',
      name: 'Zumba',
      instructor: 'María González',
      instructorId: '4',
      room: 'Sala de Clases 2',
      roomId: '3',
      day: 'Lunes',
      startTime: '19:30',
      endTime: '20:30',
      capacity: 25,
      enrolled: 20,
      occupancy: 80
    },
    {
      id: '5',
      name: 'Pilates',
      instructor: 'Laura Fernández',
      instructorId: '5',
      room: 'Sala de Clases 1',
      roomId: '2',
      day: 'Martes',
      startTime: '09:00',
      endTime: '10:00',
      capacity: 15,
      enrolled: 12,
      occupancy: 80
    },
    {
      id: '6',
      name: 'Body Pump',
      instructor: 'Carlos López',
      instructorId: '2',
      room: 'Sala de Clases 1',
      roomId: '2',
      day: 'Martes',
      startTime: '18:00',
      endTime: '19:00',
      capacity: 20,
      enrolled: 15,
      occupancy: 75
    }
  ];
  
  // Calendario
  calendarDays: any[] = [];
  
  constructor(private fb: FormBuilder) {
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      instructorId: ['', Validators.required],
      roomId: ['', Validators.required],
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      capacity: [15, [Validators.required, Validators.min(1)]]
    });
    
    // Inicializar la fecha actual
    this.selectedDate = new Date(2025, 2, 10); // 10 de marzo de 2025
    this.setWeekDates();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.calculateWeekDates();
    this.calculateClassOccupancy();
    
    // Establecer la vista de clases por defecto para que coincida con la imagen
    this.currentView = 'classes';
  }

  // Inicializar el formulario
  initializeForm(): void {
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      instructor: ['', Validators.required],
      room: ['', Validators.required],
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      capacity: [20, [Validators.required, Validators.min(1)]]
    });
  }

  // Calcular la ocupación para cada clase
  calculateClassOccupancy(): void {
    this.classes.forEach(cls => {
      cls.occupancy = Math.round((cls.enrolled / cls.capacity) * 100);
    });
  }

  // Métodos para cambiar vistas
  changeView(view: 'monthly' | 'weekly' | 'daily' | 'classes' | 'instructors' | 'rooms'): void {
    this.currentView = view;
  }

  // Métodos para navegación de fechas
  previousDay(): void {
    const prevDay = new Date(this.selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    this.selectedDate = prevDay;
  }

  nextDay(): void {
    const nextDay = new Date(this.selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    this.selectedDate = nextDay;
  }

  previousWeek(): void {
    const prevWeek = new Date(this.currentWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    this.currentWeekStart = prevWeek;
    this.setWeekDates();
  }

  nextWeek(): void {
    const nextWeek = new Date(this.currentWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    this.currentWeekStart = nextWeek;
    this.setWeekDates();
  }

  previousMonth(): void {
    if (this.currentMonth === 'enero') {
      this.currentMonth = 'diciembre';
      this.currentYear--;
    } else {
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      const currentIndex = months.indexOf(this.currentMonth);
      this.currentMonth = months[currentIndex - 1];
    }
    this.initializeCalendarData();
  }

  nextMonth(): void {
    if (this.currentMonth === 'diciembre') {
      this.currentMonth = 'enero';
      this.currentYear++;
    } else {
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      const currentIndex = months.indexOf(this.currentMonth);
      this.currentMonth = months[currentIndex + 1];
    }
    this.initializeCalendarData();
  }

  // Métodos para verificar fechas
  isToday(date: Date | number): boolean {
    if (typeof date === 'number') {
      // Si es un número (día del mes), verificamos si coincide con el día actual
      const today = new Date();
      return date === today.getDate() && 
             this.currentMonth === this.getMonthName(today.getMonth()) && 
             this.currentYear === today.getFullYear();
    } else {
      // Si es una fecha completa, comparamos año, mes y día
      const today = new Date();
      return date.getDate() === today.getDate() &&
             date.getMonth() === today.getMonth() &&
             date.getFullYear() === today.getFullYear();
    }
  }

  getMonthShort(dayIndex: number): string {
    const date = new Date(this.currentWeekStart);
    date.setDate(date.getDate() + dayIndex);
    const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return monthNames[date.getMonth()];
  }

  getMonthName(monthIndex: number): string {
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return monthNames[monthIndex];
  }

  // Método para ver todas las clases de un día específico
  viewDayClasses(day: any): void {
    // Cambiar a la vista diaria
    this.currentView = 'daily';
    
    // Establecer la fecha seleccionada para mostrar las clases de ese día
    this.selectedDate = day.date;
    
    console.log(`Mostrando todas las clases para el día ${day.day}/${this.currentMonth}/${this.currentYear}`);
  }

  // Métodos para obtener datos
  getClassesForDay(dayIndex: number): Class[] {
    const date = new Date(this.currentWeekStart);
    date.setDate(date.getDate() + dayIndex);
    const dayName = this.weekDays[dayIndex];
    
    // Filtrar clases por día de la semana
    return this.classes.filter(cls => cls.day.toLowerCase() === dayName.toLowerCase());
  }

  getDailyEvents(): Class[] {
    const dayName = this.getDayName(this.selectedDate.getDay());
    return this.classes.filter(cls => cls.day.toLowerCase() === dayName.toLowerCase())
                      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  getDayName(dayIndex: number): string {
    // Ajustar para que lunes sea 0, domingo sea 6
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    return this.weekDays[adjustedIndex];
  }

  // Métodos para inicializar datos
  setWeekDates(): void {
    this.weekDates = [];
    const startDate = new Date(this.currentWeekStart);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      this.weekDates.push(date.getDate());
    }
    
    // Establecer fecha de fin de semana
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    this.currentWeekEnd = endDate;
  }

  calculateWeekDates(): void {
    this.setWeekDates();
  }

  initializeCalendarData(): void {
    // Aquí se inicializarían los datos del calendario mensual
    // Este es un método simplificado para el ejemplo
    this.calendarDays = this.generateCalendarDays();
  }

  generateCalendarDays(): any[] {
    // Método simplificado para generar días del calendario
    const days = [];
    const monthIndex = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'].indexOf(this.currentMonth);
    
    const firstDay = new Date(this.currentYear, monthIndex, 1);
    const lastDay = new Date(this.currentYear, monthIndex + 1, 0);
    
    // Ajustar para que la semana comience en lunes (0) y termine en domingo (6)
    let firstDayOfGrid = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convertir 0 (domingo) a 6, y restar 1 al resto
    firstDayOfGrid.setDate(firstDayOfGrid.getDate() - adjustedDay);
    
    // Generar 42 días (6 semanas)
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(firstDayOfGrid);
      currentDate.setDate(currentDate.getDate() + i);
      
      const isCurrentMonth = currentDate.getMonth() === monthIndex;
      
      // Obtener clases para este día
      const dayName = this.getDayName(currentDate.getDay());
      const classesForDay = this.classes.filter(cls => cls.day.toLowerCase() === dayName.toLowerCase());
      
      days.push({
        day: currentDate.getDate(),
        date: new Date(currentDate),
        isCurrentMonth,
        classes: classesForDay,
        expanded: false // Añadir propiedad para controlar la expansión
      });
    }
    
    return days;
  }

  // Método para inicializar los días del calendario
  initCalendarDays(): void {
    const firstDayOfMonth = new Date(this.currentYear, ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'].indexOf(this.currentMonth), 1);
    const lastDayOfMonth = new Date(this.currentYear, ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'].indexOf(this.currentMonth) + 1, 0);
    
    // Determinar el primer día a mostrar (puede ser del mes anterior)
    const firstDayToShow = new Date(firstDayOfMonth);
    const dayOfWeek = firstDayOfMonth.getDay();
    // Ajustar para que la semana comience el lunes (0 = lunes, 6 = domingo)
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    firstDayToShow.setDate(firstDayToShow.getDate() - daysToSubtract);
    
    // Generar los días para mostrar (42 días = 6 semanas)
    this.calendarDays = [];
    const currentDay = new Date(firstDayToShow);
    
    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = currentDay.getMonth() === ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'].indexOf(this.currentMonth);
      
      this.calendarDays.push({
        day: currentDay.getDate(),
        date: new Date(currentDay),
        isCurrentMonth,
        classes: this.getClassesForDay(currentDay.getDay()),
        expanded: false // Añadir propiedad para controlar la expansión
      });
      
      currentDay.setDate(currentDay.getDate() + 1);
      
      // Si ya hemos mostrado todos los días del mes actual y estamos en el mes siguiente, podemos parar
      if (i > 28 && currentDay.getMonth() !== ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'].indexOf(this.currentMonth) && currentDay.getDate() > 7) {
        break;
      }
    }
  }

  // Método para expandir/contraer un día y mostrar todas las clases
  toggleDayExpansion(day: any, event: Event): void {
    // Evitar que el evento se propague al contenedor del día
    event.stopPropagation();
    
    // Cerrar cualquier otro día que esté expandido
    this.calendarDays.forEach(d => {
      if (d !== day) {
        d.expanded = false;
      }
    });
    
    // Alternar el estado de expansión del día seleccionado
    day.expanded = !day.expanded;
  }

  // Métodos para modales y acciones
  openAddClassModal(): void {
    this.showAddClassModal = true;
  }

  closeAddClassModal(): void {
    this.showAddClassModal = false;
    this.classForm.reset();
  }

  viewClassDetails(classItem: Class): void {
    this.selectedClass = classItem;
    this.showClassDetailsModal = true;
  }

  closeClassDetailsModal(): void {
    this.showClassDetailsModal = false;
    this.selectedClass = null;
  }

  // Métodos para exportar
  exportSchedule(): void {
    console.log('Exportando horario...');
    // Implementar lógica de exportación
  }

  // Métodos para gestión de clases
  saveClass(): void {
    if (this.classForm.valid) {
      // Lógica para guardar la clase
      console.log('Guardando clase:', this.classForm.value);
      this.closeAddClassModal();
    }
  }
  
  deleteClass(id: string): void {
    // Lógica para eliminar una clase
    console.log('Eliminando clase:', id);
    // Aquí iría la lógica para eliminar la clase del arreglo
  }
  
  editClass(classItem: Class): void {
    // Lógica para editar una clase
    console.log('Editando clase:', classItem);
    // Aquí iría la lógica para abrir el modal con los datos de la clase
  }

  // Métodos para instructores
  viewInstructorSchedule(instructor: Instructor): void {
    // Implementar la lógica para ver el horario de un instructor
    console.log(`Ver horario de ${instructor.name}`);
  }

  editInstructor(instructor: Instructor): void {
    // Implementar la lógica para editar un instructor
    console.log(`Editar instructor ${instructor.name}`);
  }

  // Métodos para salas
  viewRoomSchedule(room: Room): void {
    // Implementar la lógica para ver el horario de una sala
    console.log(`Ver horario de ${room.name}`);
  }

  editRoom(room: Room): void {
    // Implementar la lógica para editar una sala
    console.log(`Editar sala ${room.name}`);
  }
}
