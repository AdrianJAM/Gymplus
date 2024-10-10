import { Component, Input } from '@angular/core';
import { User } from '../../user-dashboard/user-dashboard.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-user-card.component.html',
  styleUrl: './profile-user-card.component.css',
})
export class ProfileUserCardComponent {
  @Input() user: User | undefined;
  isFace: boolean = false;

  toggleCard() {
    this.isFace = !this.isFace;
  }
}
