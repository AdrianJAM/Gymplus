import { Component, OnInit } from '@angular/core';
import { UserDashboardService } from '../user-dashboard/user-dashboard.service';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../user-dashboard/user-dashboard.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileUserCardComponent } from './profile-user-card/profile-user-card.component';
import { ModalComponent } from '../../../components/ui/modal/modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProfileUserCardComponent,
    ProfileUserCardComponent,
    ModalComponent,
  ],
  providers: [UserDashboardService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  error: string | null = null;
  isCardOpen: boolean = false;

  closeModal() {
    this.isCardOpen = false;
  }

  constructor(
    private _userDashboardService: UserDashboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this._userDashboardService.getbyid(id).subscribe((data: User) => {
        console.log(data);
        this.user = data;
      });
    });
  }
}
