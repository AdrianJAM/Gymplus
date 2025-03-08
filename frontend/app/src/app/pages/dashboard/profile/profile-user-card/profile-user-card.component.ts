import { Component, Input } from '@angular/core';
import { Member } from './../../../../core/models/member.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-user-card.component.html',
  styleUrl: './profile-user-card.component.css',
})
export class ProfileUserCardComponent {
  @Input() member: Member | undefined;
  isFace: boolean = false;

  toggleCard() {
    this.isFace = !this.isFace;
  }
}
