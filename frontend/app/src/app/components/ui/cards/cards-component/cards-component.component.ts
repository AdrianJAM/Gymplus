import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { CardData } from './cards-component.model';
import { IconWarningComponent } from '../../../icon/icon-warning/icon-warning.component';
import { CardsComponentContentComponent } from './cards-component-content/cards-component-content.component';
import { CardsComponentButtonComponent } from './cards-component-button/cards-component-button.component';
import { IconLoaderComponent } from '../../../icon/icon.component';

@Component({
  selector: 'app-cards-component',
  standalone: true,
  imports: [
    CommonModule,
    IconWarningComponent,
    CardsComponentContentComponent,
    CardsComponentButtonComponent,
    IconLoaderComponent,
  ],
  templateUrl: './cards-component.component.html',
  styleUrl: './cards-component.component.css',
})
export class CardsComponentComponent {
  @Input() data!: CardData;
  isOpen: boolean = true;
  constructor() {}

  // crear una funcion que devuelca un el icono segun su nombre en un map
  // a futuro porque ahora no hay tiempo que perder XD
  @HostListener('keypress', ['$event'])
  print(event: KeyboardEvent) {
    console.log(event.key);
  }

  toggleChildren() {
    this.isOpen = !this.isOpen;
  }
}
