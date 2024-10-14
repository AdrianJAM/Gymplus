import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Type } from '@angular/core';
import { ICON_COMPONENTS } from '../../../icon/icon-map';
import { CardData } from './cards-component.model';
import { IconWarningComponent } from '../../../icon/icon-warning/icon-warning.component';
import { CardsComponentContentComponent } from "./cards-component-content/cards-component-content.component";

@Component({
  selector: 'app-cards-component',
  standalone: true,
  imports: [CommonModule, IconWarningComponent, CardsComponentContentComponent],
  templateUrl: './cards-component.component.html',
  styleUrl: './cards-component.component.css',
})
export class CardsComponentComponent {
  @Input() data!: CardData;
  isOpen: boolean = true;
  constructor() {}

  // crear una funcon que devuelca un el icono segun su nombre en un map
  // a futuro porque ahora no hay tiempo que perder XD
  getIconComponent(): Type<any> | null {
    return this.data.icon ? ICON_COMPONENTS[this.data.icon] || null : null;
  }

  getDescriptionIconComponent(): Type<any> | null {
    // Retorna el componente del ícono de la descripción
    return this.data.descriptionIcon &&
      ICON_COMPONENTS[this.data.descriptionIcon]
      ? ICON_COMPONENTS[this.data.descriptionIcon]
      : null;
  }

  toggleChildren() {
    console.log('click');
    this.isOpen = !this.isOpen;
  }
}
