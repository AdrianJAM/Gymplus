import { Injectable } from '@angular/core';
import { UserRole } from '../../../core/enums/user-roles.enum';

export interface SidebarMenuItem {
  icon: string;
  label: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly adminMenu: SidebarMenuItem[] = [
    { 
      icon: '🧑🏼‍💻', 
      label: 'Usuarios', 
      route: '/dashboard/users'
    },
    { 
      icon: '👥', 
      label: 'Miembros', 
      route: '/dashboard/members'
    },
    { 
      icon: '📊', 
      label: 'Reportes', 
      route: '/dashboard/reports'
    },
    { 
      icon: '📦', 
      label: 'Inventario', 
      route: '/dashboard/inventory'
    },
    { 
      icon: '📅', 
      label: 'Horarios', 
      route: '/dashboard/schedule'
    },
    { 
      icon: '💪', 
      label: 'Rutinas', 
      route: '/dashboard/routines'
    },
    { 
      icon: '✅', 
      label: 'Asistencia', 
      route: '/dashboard/attendance'
    },
    { 
      icon: '🔧', 
      label: 'Configuración', 
      route: '/dashboard/config'
    }
  ];

  private readonly managerMenu: SidebarMenuItem[] = [
    { 
      icon: '👥', 
      label: 'Miembros', 
      route: '/dashboard/members'
    },
    { 
      icon: '📊', 
      label: 'Reportes', 
      route: '/dashboard/reports'
    },
    { 
      icon: '📦', 
      label: 'Inventario', 
      route: '/dashboard/inventory'
    },
    { 
      icon: '📅', 
      label: 'Horarios', 
      route: '/dashboard/schedule'
    }
  ];

  private readonly employeeMenu: SidebarMenuItem[] = [
    { 
      icon: '👥', 
      label: 'Miembros', 
      route: '/dashboard/members'
    },
    { 
      icon: '💪', 
      label: 'Rutinas', 
      route: '/dashboard/routines'
    },
    { 
      icon: '📅', 
      label: 'Horarios', 
      route: '/dashboard/schedule'
    },
    { 
      icon: '✅', 
      label: 'Asistencia', 
      route: '/dashboard/attendance'
    }
  ];

  getMenuByRole(role: UserRole): SidebarMenuItem[] {
    switch (role) {
      case UserRole.ADMIN:
        return this.adminMenu;
      case UserRole.MANAGER:
        return this.managerMenu;
      case UserRole.EMPLOYEE:
        return this.employeeMenu;
      default:
        return [];
    }
  }

  getTitleByRole(role: UserRole): string {
    const baseTitle = 'Gymplus';
    switch (role) {
      case UserRole.ADMIN:
        return `${baseTitle} - Administrador`;
      case UserRole.MANAGER:
        return `${baseTitle} - Gerente`;
      case UserRole.EMPLOYEE:
        return `${baseTitle} - Empleado`;
      default:
        return baseTitle;
    }
  }
}
