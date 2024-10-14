import { Component, OnInit } from '@angular/core';
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
    email: 'Correo',
    ci: 'CI',
    phone: 'Telefono',
    img_url: 'Imagen',
  };

  user: User = { id: '', name: '', email: '', ci: '', phone: '', img_url: '' };
  editing: boolean = true;
  isCreating: boolean = false;
  data: CardData = {
    title: 'Gestion de usuarios',
    description:
      'Aqui podras ver y modificar los usuarios de la aplicacion, ten cuidado modificar erroneamente alguno de los datos podria llegar a causar problemas en el servidor o cliente.',
    descriptionIcon: 'warning',
    icon: 'settings',
    content: {
      table: {
        headers: Object.keys(this.headerdsMapping).map((key) => {
          return key;
        }),
        data: [],
      },
    },
  };

  constructor(private _userDashboardService: UserDashboardService) {}

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
    this._userDashboardService.getAll().subscribe((data: any) => {
      console.log(data);
      this.users = data;
      this.data.content.table.data = this.users;
    });
  }

  create() {
    this._userDashboardService.create(this.user).subscribe((data: any) => {
      this.users.push(data);
      this.resetUser();
    });
  }
  getbyid(userId: string) {
    this._userDashboardService.getbyid(userId).subscribe((data: any) => {
      this.user = data;
    });
  }

  update(userId: string) {
    this._userDashboardService
      .update(userId, this.user)
      .subscribe((data: any) => {
        this.editing = false;
        this.resetUser();
        this.getAll();
      });
  }

  delete(userId: string) {
    this._userDashboardService.delete(userId).subscribe((data: any) => {
      this.getAll();
    });
  }
  cancel() {
    this.editing = false;
    this.resetUser();
  }
  resetUser() {
    this.user = { id: '', name: '', email: '', ci: '', phone: '', img_url: '' };
  }
}
