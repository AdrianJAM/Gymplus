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
export class CardsComponentContentComponent implements OnInit, OnChanges {
  @Input() data!: CardContent;

  ngOnInit(): void {
    console.log('Data recibida:', this.data);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Detecta cambios en las entradas y puede acceder a data cuando se actualice
    if (changes['data']) {
      console.log('Data recibida:', this.data);
    }
  }
  constructor() {}
}
