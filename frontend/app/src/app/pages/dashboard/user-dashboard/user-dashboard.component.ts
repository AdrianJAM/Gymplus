import { Component, OnInit } from '@angular/core';
import { UserDashboardService } from './user-dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from './user-dashboard.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [HttpClientModule, UserDashboardService],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  users: User[] = [];

  user: User = { id: '', name: '', email: '', ci: '', phone: '', img_url: '' };
  editing: boolean = true;
  isCreating: boolean = false;

  constructor(private _userDashboardService: UserDashboardService) {}

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
