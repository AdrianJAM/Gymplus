import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { memberDashboardComponent } from './../app/pages/dashboard/modules/members/members.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { ConfigComponent } from './pages/dashboard/modules/config/config.component';
import { UsersComponent } from './pages/dashboard/modules/users/users.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      // Rutas de Administrador
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/:id',
        component: ProfileComponent,
      },
      {
        path: 'reports',
        loadComponent: () => 
          import('./pages/dashboard/modules/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'inventory',
        loadComponent: () => 
          import('./pages/dashboard/modules/inventory/inventory.component').then(m => m.InventoryComponent)
      },
      {
        path: 'config',
        component: ConfigComponent,
      },

      // Rutas de Gerente
      {
        path: 'members',
        loadComponent: () => 
          import('./pages/dashboard/modules/members/members.component').then(m => m.memberDashboardComponent)
      },
      {
        path: 'schedule',
        loadComponent: () => 
          import('./pages/dashboard/modules/schedule/schedule.component').then(m => m.ScheduleComponent)
      },

      // Rutas de Empleado
      {
        path: 'routines',
        loadComponent: () => 
          import('./pages/dashboard/modules/routines/routines.component').then(m => m.RoutinesComponent)
      },
      {
        path: 'attendance',
        loadComponent: () => 
          import('./pages/dashboard/modules/attendance/attendance.component').then(m => m.AttendanceComponent)
      }
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
