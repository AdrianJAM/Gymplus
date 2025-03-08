import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../../components/ui/sidebar/sidebar.component';
import { SidebarMenuItem } from '../../core/services/sidebar/sidebar.service';
import { UserStateService } from '../../core/services/users/user-state.service';
import { UserRole } from '../../core/enums/user-roles.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = false;
  isLargeScreen = false;
  currentRole: UserRole = UserRole.ADMIN;
  menuItems: SidebarMenuItem[] = [];

  // Botones para cambiar de rol (solo para pruebas)
  roles = [
    { label: 'Admin', value: UserRole.ADMIN },
    { label: 'Gerente', value: UserRole.MANAGER },
    { label: 'Empleado', value: UserRole.EMPLOYEE }
  ];

  constructor(private userStateService: UserStateService) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
    
    // Suscribirse a cambios en el rol
    this.userStateService.currentRole$.subscribe(role => {
      this.currentRole = role;
      // Aquí podrías actualizar el menú según el rol
    });
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 1366;
    // Only set isSidebarOpen to false on small screens
    // This allows the sidebar to stay in its current state on large screens
    if (!this.isLargeScreen) {
      this.isSidebarOpen = false;
    }
  }

  // Método para cambiar el rol (para pruebas)
  changeRole(role: UserRole) {
    this.userStateService.changeRole(role);
  }
}
