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

  onClick() {
    console.log('click');
  }
}
