import { Component, Input } from '@angular/core';
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
  @Input() data!: CardContent<unknown>;

  getRowValue(row: unknown, header: string): string {
    if (typeof row === 'object' && row !== null && header in row) {
      return (row as Record<string, unknown>)[header]?.toString() ?? '';
    }
    return ''; // o manejar el caso en el que row no sea válido
  }

  constructor() {}
}
