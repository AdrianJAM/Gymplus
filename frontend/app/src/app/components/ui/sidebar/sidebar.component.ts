import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarMenuItem, SidebarService } from '../../../core/services/sidebar/sidebar.service';
import { UserStateService } from '../../..//core/services/users/user-state.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() isLargeScreen: boolean = false;
  @Input() menuItems: SidebarMenuItem[] = [];
  
  // Eliminamos el setter y getter de title
  public _title: string = '';
  @Output() toggleSidebar = new EventEmitter<void>();
  constructor(
    private sidebarService: SidebarService,
    private userStateService: UserStateService
  ) {}
  ngOnInit() {
    // Suscribirse a cambios en el rol
    this.userStateService.currentRole$.subscribe(role => {
      this.menuItems = this.sidebarService.getMenuByRole(role);
      this._title = this.sidebarService.getTitleByRole(role);
    });
  }
  get title(): string {
    return this._title;
  }
  onToggle() {
    this.toggleSidebar.emit();
  }
  getRolFromTitle(): string {
    if (!this._title) return '';
    
    // Si el título contiene un guión, extraer la parte después del guión
    if (this._title.includes('-')) {
      return this._title.split('-')[1].trim();
    }
    
    return '';
  }
}
