import { Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/dashboard/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { DashboardConfigComponent } from './pages/dashboard/dashboard-config/dashboard-config.component';

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
      {
        path: 'users',
        component: UserDashboardComponent,
      },
      {
        path: 'users/:id',
        component: ProfileComponent,
      },
      {
        path: 'config',
        component: DashboardConfigComponent,
      },
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
