import { Component, Input } from '@angular/core';
import { CardButton } from './cards-compontent-button.model';
import { CommonModule } from '@angular/common';
import { IconLoaderComponent } from '../../../../icon/icon.component';

@Component({
  selector: 'app-cards-component-button',
  standalone: true,
  imports: [CommonModule, IconLoaderComponent],
  templateUrl: './cards-component-button.component.html',
  styleUrls: ['./cards-component-button.component.css'],
})
export class CardsComponentButtonComponent {
  @Input() data!: CardButton;

  constructor() {}

  getStyles() {
    const styles = {
      primary: {
        color: 'bg-indigo-600',
        textcolor: 'text-white',
        hovercolor: 'hover:bg-indigo-700',
      },
      secondary: {
        color: 'bg-gray-200',
        textcolor: 'text-gray-800',
        hovercolor: 'hover:bg-gray-300',
      },
      danger: {
        color: 'bg-red-600',
        textcolor: 'text-white',
        hovercolor: 'hover:bg-red-700',
      },
    };
    return styles[this.data.variant || 'primary'];
  }
}
