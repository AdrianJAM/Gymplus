import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeader } from './cards-component-table.model';

@Component({
  selector: 'app-cards-component-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards-component-table.component.html',
  styleUrl: './cards-component-table.component.css'
})
export class CardsComponentTableComponent {
  @Input() headers: TableHeader[] = [];
  @Input() data: any[] = [];
  @Input() title?: string;
  
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
}
