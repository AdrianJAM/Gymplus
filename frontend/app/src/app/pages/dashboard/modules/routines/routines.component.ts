import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Routine {
  id: number;
  title: string;
  description: string;
  level: string;
  type: string;
  goal: string;
  duration: number;
  exercises: number;
  popularity: number;
  creator: string;
}

interface Exercise {
  id: number;
  name: string;
  description: string;
  muscleGroups: string[];
  level: string;
  imageUrl: string;
  videoUrl?: string;
}

interface Member {
  id: number;
  name: string;
  level: string;
  goal: string;
  photoUrl?: string;
  assignedRoutines: number[];
}

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {
  activeTab: 'routines' | 'exercises' | 'assigned' = 'routines';
  searchTerm: string = '';
  selectedLevel: string = 'Todos los niveles';
  selectedGoal: string = 'Todos los objetivos';
  selectedMuscleGroup: string = 'Todos los grupos musculares';
  
  routines: Routine[] = [
    {
      id: 1,
      title: 'Principiante Full Body',
      description: 'Rutina completa para principiantes enfocada en todos los grupos musculares principales.',
      level: 'Principiante',
      type: 'Full Body',
      goal: 'Tonificación',
      duration: 45,
      exercises: 6,
      popularity: 85,
      creator: 'Roberto Sánchez'
    },
    {
      id: 2,
      title: 'Hipertrofia Pecho y Espalda',
      description: 'Rutina de alta intensidad para desarrollo muscular de pecho y espalda.',
      level: 'Intermedio',
      type: 'Split',
      goal: 'Hipertrofia',
      duration: 60,
      exercises: 6,
      popularity: 75,
      creator: 'Roberto Sánchez'
    },
    {
      id: 3,
      title: 'Quema Grasa HIIT',
      description: 'Entrenamiento de alta intensidad por intervalos para máxima quema de calorías.',
      level: 'Avanzado',
      type: 'Cardio',
      goal: 'Pérdida de peso',
      duration: 30,
      exercises: 6,
      popularity: 92,
      creator: 'María González'
    },
    {
      id: 4,
      title: 'Fuerza Piernas',
      description: 'Rutina enfocada en desarrollar fuerza y potencia en el tren inferior.',
      level: 'Intermedio',
      type: 'Piernas',
      goal: 'Fuerza',
      duration: 50,
      exercises: 5,
      popularity: 75,
      creator: 'Carlos López'
    },
    {
      id: 5,
      title: 'Core y Estabilidad',
      description: 'Rutina para fortalecer el núcleo y mejorar la estabilidad corporal.',
      level: 'Todos los niveles',
      type: 'Core',
      goal: 'Funcional',
      duration: 40,
      exercises: 6,
      popularity: 80,
      creator: 'Laura Fernández'
    },
    {
      id: 6,
      title: 'Movilidad y Recuperación',
      description: 'Rutina de estiramientos y ejercicios de movilidad para mejorar la flexibilidad y recuperación.',
      level: 'Todos los niveles',
      type: 'Movilidad',
      goal: 'Recuperación',
      duration: 30,
      exercises: 6,
      popularity: 65,
      creator: 'Carlos López'
    }
  ];

  exercises: Exercise[] = [
    {
      id: 1,
      name: 'Sentadillas',
      description: 'Ejercicio básico para piernas que trabaja cuádriceps, glúteos y core.',
      muscleGroups: ['Piernas', 'Glúteos', 'Core'],
      level: 'Principiante',
      imageUrl: 'assets/exercises/squat.jpg'
    },
    {
      id: 2,
      name: 'Press de banca',
      description: 'Ejercicio compuesto para desarrollo del pecho, hombros y tríceps.',
      muscleGroups: ['Pecho', 'Hombros', 'Tríceps'],
      level: 'Principiante',
      imageUrl: 'assets/exercises/bench-press.jpg'
    },
    {
      id: 3,
      name: 'Remo con mancuerna',
      description: 'Ejercicio para fortalecer la espalda media y baja.',
      muscleGroups: ['Espalda', 'Bíceps'],
      level: 'Principiante',
      imageUrl: 'assets/exercises/dumbbell-row.jpg'
    },
    {
      id: 4,
      name: 'Peso muerto',
      description: 'Ejercicio compuesto que trabaja principalmente la cadena posterior.',
      muscleGroups: ['Espalda', 'Glúteos', 'Isquiotibiales'],
      level: 'Intermedio',
      imageUrl: 'assets/exercises/deadlift.jpg'
    },
    {
      id: 5,
      name: 'Press militar',
      description: 'Ejercicio para desarrollar fuerza y tamaño en los hombros.',
      muscleGroups: ['Hombros', 'Tríceps'],
      level: 'Intermedio',
      imageUrl: 'assets/exercises/military-press.jpg'
    },
    {
      id: 6,
      name: 'Zancadas',
      description: 'Ejercicio unilateral para piernas que mejora el equilibrio y la coordinación.',
      muscleGroups: ['Piernas', 'Glúteos', 'Core'],
      level: 'Principiante',
      imageUrl: 'assets/exercises/lunges.jpg'
    },
    {
      id: 7,
      name: 'Dominadas',
      description: 'Ejercicio para desarrollar la espalda y los brazos usando el peso corporal.',
      muscleGroups: ['Espalda', 'Bíceps'],
      level: 'Avanzado',
      imageUrl: 'assets/exercises/pull-ups.jpg'
    },
    {
      id: 8,
      name: 'Plancha',
      description: 'Ejercicio isométrico para fortalecer el core y mejorar la estabilidad.',
      muscleGroups: ['Core', 'Hombros'],
      level: 'Todos los niveles',
      imageUrl: 'assets/exercises/plank.jpg'
    },
    {
      id: 9,
      name: 'Curl de bíceps',
      description: 'Ejercicio de aislamiento para desarrollar los bíceps.',
      muscleGroups: ['Bíceps'],
      level: 'Principiante',
      imageUrl: 'assets/exercises/bicep-curl.jpg'
    }
  ];

  members: Member[] = [
    {
      id: 1,
      name: 'Juan Pérez',
      level: 'Principiante',
      goal: 'Pérdida de peso',
      assignedRoutines: [1, 3]
    },
    {
      id: 2,
      name: 'Ana García',
      level: 'Intermedio',
      goal: 'Tonificación',
      assignedRoutines: [2]
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      level: 'Avanzado',
      goal: 'Hipertrofia',
      assignedRoutines: [4, 5]
    },
    {
      id: 4,
      name: 'María López',
      level: 'Principiante',
      goal: 'Funcional',
      assignedRoutines: [6]
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Inicialización del componente
  }

  setActiveTab(tab: 'routines' | 'exercises' | 'assigned'): void {
    this.activeTab = tab;
  }

  createRoutine(): void {
    console.log('Crear nueva rutina');
    // Aquí iría la lógica para abrir un modal o navegar a la página de creación de rutinas
  }

  assignRoutine(): void {
    console.log('Asignar rutina');
    // Aquí iría la lógica para abrir un modal de asignación de rutinas
  }

  assignNewRoutine(memberId: number): void {
    console.log(`Asignar nueva rutina al miembro con ID: ${memberId}`);
    // Aquí iría la lógica para abrir un modal de asignación de rutinas a un miembro específico
  }

  viewRoutine(routineId: number): void {
    console.log(`Ver rutina con ID: ${routineId}`);
    // Aquí iría la lógica para navegar a la página de detalles de la rutina
  }

  viewExercise(exerciseId: number): void {
    console.log(`Ver ejercicio con ID: ${exerciseId}`);
    // Aquí iría la lógica para navegar a la página de detalles del ejercicio
  }

  getRoutineById(routineId: number): Routine | undefined {
    return this.routines.find(routine => routine.id === routineId);
  }

  filterRoutines(): Routine[] {
    return this.routines.filter(routine => {
      // Filtrar por término de búsqueda
      const searchMatch = this.searchTerm === '' || 
        routine.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        routine.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Filtrar por nivel
      const levelMatch = this.selectedLevel === 'Todos los niveles' || 
        routine.level === this.selectedLevel;
      
      // Filtrar por objetivo
      const goalMatch = this.selectedGoal === 'Todos los objetivos' || 
        routine.goal === this.selectedGoal;
      
      return searchMatch && levelMatch && goalMatch;
    });
  }

  filterExercises(): Exercise[] {
    return this.exercises.filter(exercise => {
      // Filtrar por término de búsqueda
      const searchMatch = this.searchTerm === '' || 
        exercise.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Filtrar por nivel
      const levelMatch = this.selectedLevel === 'Todos los niveles' || 
        exercise.level === this.selectedLevel;
      
      // Filtrar por grupo muscular
      const muscleGroupMatch = this.selectedMuscleGroup === 'Todos los grupos musculares' || 
        exercise.muscleGroups.includes(this.selectedMuscleGroup);
      
      return searchMatch && levelMatch && muscleGroupMatch;
    });
  }

  filterMembers(): Member[] {
    return this.members.filter(member => {
      // Filtrar por término de búsqueda
      const searchMatch = this.searchTerm === '' || 
        member.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.goal.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Filtrar por nivel
      const levelMatch = this.selectedLevel === 'Todos los niveles' || 
        member.level === this.selectedLevel;
      
      return searchMatch && levelMatch;
    });
  }
}
