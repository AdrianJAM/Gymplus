import { Component, HostListener, OnInit } from '@angular/core';
import { UserDashboardService } from './user-dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from './user-dashboard.model';
import { HttpClientModule } from '@angular/common/http';
import { CardsComponentComponent } from '../../../components/ui/cards/cards-component/cards-component.component';
import { CardData } from '../../../components/ui/cards/cards-component/cards-component.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CardsComponentComponent],
  providers: [HttpClientModule, UserDashboardService],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  users: User[] = [];

  headerdsMapping: { [key: string]: string } = {
    name: 'Nombre',
    ci: 'CI',
    phone: 'Telefono',
  };

  user: User = { id: '', name: '', email: '', ci: '', phone: '', img_url: '' };
  isCreating: boolean = false;
  data: CardData = {
    title: 'Gestion de usuarios',
    description:
      'Aqui podras ver y modificar los usuarios de la aplicacion, ten cuidado modificar erroneamente alguno de los datos podria llegar a causar problemas en el servidor o cliente.',
    descriptionIcon: 'warning',
    icon: 'server',
    content: {
      table: {
        headers: Object.keys(this.headerdsMapping).map((key) => {
          return key;
        }),
        data: this.users.length > 0 ? this.users : [],
      },
    },
    Buttons: [
      {
        disabled: false,
        icon: 'server',
        action: () => {
          this.isCreating = true;
        },
        tooltip: ' Crear un nuevo usuario',
      },
      {
        title: 'exportar a excel',
        icon: 'excel',
        color: 'bg-green-500',
        textcolor: 'text-white',
        action: () => {
          alert('Estamos trabajando en esta funcion...');
        },
        tooltip: 'Exportar a excel',
      },
    ],
  };

  constructor(private _userDashboardService: UserDashboardService) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent() {
    this.isCreating = false;
  }

  getHeadersMapping() {
    return this.headerdsMapping;
  }

  ngOnInit(): void {
    this.getAll();
  }
  navigateToUser(id: string) {
    window.location.href = `dashboard/users/${id}`;
  }

  getAll() {
    this._userDashboardService.getAll().subscribe((data: User[]) => {
      console.log('users', data);
      this.users = data;
      if (this.data.content && this.data.content.table) {
        this.data.content.table.data = data;
      }
    });
  }

  create() {
    this._userDashboardService.create(this.user).subscribe((data: User) => {
      this.users.push(data);
      this.resetUser();
    });
  }
  getbyid(userId: string) {
    this._userDashboardService.getbyid(userId).subscribe((data: User) => {
      this.user = data;
    });
  }

  update(userId: string) {
    this._userDashboardService
      .update(userId, this.user)
      .subscribe((data: User) => {
        console.log(data);
        this.resetUser();
        this.getAll();
      });
  }

  delete(userId: string) {
    this._userDashboardService.delete(userId).subscribe((data: void) => {
      console.log(data);
      this.getAll();
    });
  }
  cancel() {
    this.resetUser();
  }
  resetUser() {
    this.user = { id: '', name: '', email: '', ci: '', phone: '', img_url: '' };
  }
}
