import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-warning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-warning.component.html',
  styleUrl: './icon-warning.component.css',
})
export class IconWarningComponent {
  @Input() iconClass: string = '';
}
