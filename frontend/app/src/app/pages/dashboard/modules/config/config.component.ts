import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  // Datos del sistema
  systemStatus = 'Activo';
  lastRestart = 'hace 7 días';
  activeUsers = 24;
  usersPercentage = '+12% vs. promedio';
  responseTime = '120ms';
  responseTimeDesc = 'Promedio últimas 24h';
  errorsToday = 2;
  errorsComparison = '-5 vs. ayer';
  
  // Pestaña activa
  activeTab = 'general';
  
  // Datos de las pestañas
  nodeVersion = 'v18.12.0';
  environment = 'Desarrollo';
  
  // Base de datos
  dbStatus = 'Conectado';
  dbSize = '2343 MB';
  
  // Debug
  consoleLog = [
    { timestamp: '2024-03-14 10:35:43', message: 'Servidor iniciado', type: 'info' },
    { timestamp: '2024-03-14 10:36:12', message: 'Base de datos conectada', type: 'info' },
    { timestamp: '2024-03-14 10:36:17', message: 'Cache inicializado', type: 'info' },
    { timestamp: '2024-03-14 10:38:37', message: 'Endpoints API registrados', type: 'success' }
  ];
  
  // Métricas
  memoryUsage = '456 MB';
  cpuLoad = '23%';
  activeSessions = 12;
  
  // API
  apiKey = 'dev_key_12345k/89';
  endpoints = [
    { path: '/api/members', status: 'Activo' },
    { path: '/api/subscriptions', status: 'Activo' },
    { path: '/api/payments', status: 'Activo' }
  ];
  
  // Seguridad
  twoFactorEnabled = false;
  lastAccessAttempt = '2024-03-14 10:15:23';
  ipAddress = '192.168.1.100';
  browser = 'Chrome/120.0.0.0';
  
  constructor() {}
  
  ngOnInit(): void {
    // Inicialización del componente
  }
  
  changeTab(tab: string): void {
    this.activeTab = tab;
  }
  
  clearCache(): void {
    // Lógica para limpiar el caché
    console.log('Caché limpiado');
  }
  
  resetDatabase(): void {
    // Lógica para resetear la base de datos
    console.log('Base de datos reseteada');
  }
  
  regenerateApiKey(): void {
    // Lógica para regenerar la clave API
    this.apiKey = 'dev_key_' + Math.floor(Math.random() * 1000000);
    console.log('Clave API regenerada');
  }
}
