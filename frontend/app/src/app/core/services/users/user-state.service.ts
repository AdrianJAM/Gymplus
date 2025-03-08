import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from '../../enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  // Comenzamos con un rol por defecto
  private currentRole = new BehaviorSubject<UserRole>(UserRole.ADMIN);
  currentRole$ = this.currentRole.asObservable();

  // Método para obtener el rol actual
  getCurrentRole(): UserRole {
    return this.currentRole.value;
  }

  // Método para cambiar el rol (esto lo usaremos para pruebas)
  changeRole(newRole: UserRole) {
    this.currentRole.next(newRole);
  }
}
