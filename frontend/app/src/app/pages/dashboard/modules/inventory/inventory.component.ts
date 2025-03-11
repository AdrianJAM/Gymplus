import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface InventoryItem {
  id: string;
  name: string;
  type: string;
  category?: string;
  quantity: number;
  status: string;
  location?: string;
  lastMaintenance?: Date;
  minStock?: number;
  selected?: boolean;
}

interface MaintenanceItem {
  id: string;
  equipment: string;
  type: string;
  status: string;
  date: Date;
  technician: string;
  selected?: boolean;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class InventoryComponent implements OnInit {
  // UI State
  currentTab: 'equipamiento' | 'consumibles' | 'mantenimiento' = 'equipamiento';
  showAddItemModal = false;
  searchQuery = '';
  selectedType = '';
  selectedStatus = '';

  // Form
  itemForm: FormGroup;

  // Data
  equipmentItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Mancuernas 10Kg (par)',
      type: 'Pesas',
      quantity: 5,
      status: 'Activo',
      location: 'Área de pesas',
      lastMaintenance: new Date('2023-12-14')
    },
    {
      id: '2',
      name: 'Banco de pesas ajustable',
      type: 'Equipamiento',
      quantity: 3,
      status: 'Activo',
      location: 'Área de pesas',
      lastMaintenance: new Date('2024-01-09')
    },
    {
      id: '3',
      name: 'Cinta de correr',
      type: 'Cardio',
      quantity: 4,
      status: 'Mantenimiento',
      location: 'Área de cardio',
      lastMaintenance: new Date('2024-02-04')
    }
  ];

  consumableItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Toallas desechables',
      type: 'Consumible',
      category: 'Limpieza',
      quantity: 500,
      status: 'En stock',
      minStock: 100
    },
    {
      id: '2',
      name: 'Gel antibacterial',
      type: 'Consumible',
      category: 'Limpieza',
      quantity: 15,
      status: 'En stock',
      minStock: 5
    },
    {
      id: '3',
      name: 'Desinfectante de superficies',
      type: 'Consumible',
      category: 'Limpieza',
      quantity: 8,
      status: 'En stock',
      minStock: 3
    }
  ];

  maintenanceItems: MaintenanceItem[] = [
    {
      id: '1',
      equipment: 'Cinta de correr #2',
      type: 'Preventivo',
      status: 'Programado',
      date: new Date('2024-03-14'),
      technician: 'Juan Pérez'
    },
    {
      id: '2',
      equipment: 'Máquina de poleas #1',
      type: 'Correctivo',
      status: 'En progreso',
      date: new Date('2024-03-09'),
      technician: 'Carlos Rodríguez'
    },
    {
      id: '3',
      equipment: 'Bicicleta estática #3',
      type: 'Preventivo',
      status: 'Completado',
      date: new Date('2024-02-27'),
      technician: 'Juan Pérez'
    }
  ];

  categories = ['Pesas', 'Cardio', 'Limpieza', 'Accesorios'];

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      category: [''],
      quantity: [0, [Validators.required, Validators.min(0)]],
      location: [''],
      minStock: [0]
    });
  }

  ngOnInit(): void {
    // Inicializar cualquier dato necesario
  }

  get lowStockCount(): number {
    return this.consumableItems.filter(item => item.quantity <= (item.minStock || 0)).length;
  }

  get scheduledMaintenanceCount(): number {
    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7);

    return this.maintenanceItems.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= today && itemDate <= endOfWeek;
    }).length;
  }

  setTab(tab: 'equipamiento' | 'consumibles' | 'mantenimiento'): void {
    this.currentTab = tab;
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    switch (this.currentTab) {
      case 'equipamiento':
        this.equipmentItems.forEach(item => item.selected = checked);
        break;
      case 'consumibles':
        this.consumableItems.forEach(item => item.selected = checked);
        break;
      case 'mantenimiento':
        this.maintenanceItems.forEach(item => item.selected = checked);
        break;
    }
  }

  openAddItemModal(): void {
    this.showAddItemModal = true;
  }

  closeAddItemModal(): void {
    this.showAddItemModal = false;
    this.itemForm.reset();
  }

  saveItem(): void {
    if (this.itemForm.valid) {
      const formValue = this.itemForm.value;
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        name: formValue.name,
        type: formValue.type,
        category: formValue.category,
        quantity: formValue.quantity,
        status: 'Activo',
        location: formValue.location,
        minStock: formValue.minStock
      };

      if (formValue.type === 'equipamiento') {
        this.equipmentItems.push(newItem);
      } else {
        this.consumableItems.push(newItem);
      }

      this.closeAddItemModal();
    }
  }

  openActionMenu(item: InventoryItem | MaintenanceItem): void {
    // Implementar menú de acciones
    console.log('Abrir menú de acciones para:', item);
  }

  exportInventory(): void {
    // Implementar exportación
    console.log('Exportar inventario');
  }
}
