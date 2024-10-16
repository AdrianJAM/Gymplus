import {
  Component,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  close() {
    this.closeModal.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    this.close();
  }
}
