import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgClass, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = false;
  isLargeScreen = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  toggleSidebar() {
    if (!this.isLargeScreen) {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }

  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 1366;
    if (this.isLargeScreen) {
      this.isSidebarOpen = true;
    } else {
      this.isSidebarOpen = false;
    }
  }
}
