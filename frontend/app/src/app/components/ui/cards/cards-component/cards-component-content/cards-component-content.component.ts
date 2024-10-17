import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CardContent } from './cards-component-content.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-component-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards-component-content.component.html',
  styleUrl: './cards-component-content.component.css',
})
export class CardsComponentContentComponent {
  @Input() data!: CardContent;

  constructor() {}
}
