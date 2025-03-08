import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../../../core/models/user.model';
import { UserRole } from '../../../../core/enums/user-roles.enum';
import { UserService } from '../../../../core/services/users/user.service';
import { CardsComponentComponent } from '../../../../components/ui/cards/cards-component/cards-component.component';
import { CardData } from '../../../../components/ui/cards/cards-component/cards-component.model';
import { CardsComponentTableComponent } from '../../../../components/ui/cards/cards-component/cards-component-table/cards-component-table.component';
import { TableHeader } from '../../../../components/ui/cards/cards-component/cards-component-table/cards-component-table.model';
import { CardsComponentButtonComponent } from '../../../../components/ui/cards/cards-component/cards-component-button/cards-component-button.component';
import { ModalComponent } from '../../../../components/ui/modal/modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, CardsComponentComponent, CardsComponentTableComponent, CardsComponentButtonComponent, ModalComponent],
  providers: [HttpClientModule, UserService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  // Expose UserRole enum to the template
  UserRole = UserRole;
  // Properties for editing
  isEditing: boolean = false;
  editingUser: User = {
    name: '',
    email: '',
    role: UserRole.EMPLOYEE
  };
  editingId: string = '';
  showModal: boolean = false;
  userToDelete: User | null = null;
  
  // Delete user functionality
  deleteUser(user: User) {
    this.userToDelete = user;
    this.showModal = true;
  }
  
  onConfirmDelete() {
    if (this.userToDelete && this.userToDelete.id) {
      // In a real application, this would call the service
      // this._userService.delete(this.userToDelete.id).subscribe({
      //   next: () => {
      console.log('Usuario eliminado');
      this.users = this.users.filter(u => u.id !== this.userToDelete?.id);
      this.showModal = false;
      //   },
      //   error: (error) => {
      //     console.error('Error al eliminar el usuario:', error);
      //   }
      // });
    }
  }
  
  onCancelDelete() {
    this.showModal = false;
  }
  
  // Close modals with ESC key
  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent() {
    this.isCreating = false;
    this.isEditing = false;
  }
  
  // Edit user functionality
  editUser(user: User) {
    this.editingUser = {...user};
    this.editingId = user.id || '';
    this.isEditing = true;
  }
  
  // Update user functionality
  updateUser() {
    if (this.editingId) {
      // In a real application, this would call the service
      // this._userService.update(this.editingId, this.editingUser).subscribe({
      //   next: (data: User) => {
      console.log('Usuario actualizado:', this.editingUser);
      const index = this.users.findIndex(u => u.id === this.editingId);
      if (index !== -1) {
        this.users[index] = { ...this.editingUser, id: this.editingId };
      }
      this.isEditing = false;
      //   },
      //   error: (error) => {
      //     console.error('Error updating user:', error);
      //   }
      // });
    }
  }
  
  // Method to close all modals
  closeModals() {
    this.isCreating = false;
    this.isEditing = false;
  }
  
  user: User = {
    name: '',
    email: '',
    role: UserRole.EMPLOYEE
  };
  isCreating: boolean = false;
  
  searchQuery: string = '';
  users: User[] = [
    {
      id: '1',
      name: 'Admin Usuario',
      email: 'admin@gymplus.com',
      role: UserRole.ADMIN
    },
    {
      id: '2',
      name: 'Gerente Principal',
      email: 'gerente@gymplus.com',
      role: UserRole.MANAGER
    },
    {
      id: '3',
      name: 'Empleado Recepción',
      email: 'recepcion@gymplus.com',
      role: UserRole.EMPLOYEE
    },
    {
      id: '4',
      name: 'Empleado Entrenador',
      email: 'entrenador@gymplus.com',
      role: UserRole.EMPLOYEE
    },
    {
      id: '5',
      name: 'Gerente Secundario',
      email: 'gerente2@gymplus.com',
      role: UserRole.MANAGER
    }
  ];

  get filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  tableHeaders: TableHeader[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rol' },
    { key: 'actions', label: '', width: 'w-[50px]' }
  ];

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    // In a real application, this would call the service to get all users
    // this.getAllUsers();
  }
  
  // Create user functionality
  create() {
    // In a real application, this would call the service
    // this._userService.create(this.user).subscribe((data: User) => {
    const newUser = {
      ...this.user,
      id: (this.users.length + 1).toString()
    };
    this.users.push(newUser);
    this.resetUser();
    this.isCreating = false;
    // });
  }
  
  // Reset user form
  resetUser() {
    this.user = {
      name: '',
      email: '',
      role: UserRole.EMPLOYEE
    };
  }

  // Export to Excel functionality (placeholder)
  exportToExcel() {
    alert('Estamos trabajando en esta función...');
  }

  // Set creating mode
  setCreating() {
    console.log('Botón Nuevo Usuario CLIC');
    this.isCreating = true;
  }
  
  // Get role display name
  getRoleDisplayName(role: UserRole): string {
    switch(role) {
      case UserRole.ADMIN:
        return 'Administrador';
      case UserRole.MANAGER:
        return 'Gerente';
      case UserRole.EMPLOYEE:
        return 'Empleado';
      default:
        return 'Desconocido';
    }
  }
}
