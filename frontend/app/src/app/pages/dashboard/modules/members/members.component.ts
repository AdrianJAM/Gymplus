import { Component, HostListener, OnInit } from '@angular/core';
import { MemberService } from './../../../../core/services/members/member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Member } from './../../../../core/models/member.model';
import { HttpClientModule } from '@angular/common/http';
import { CardsComponentComponent } from '../../../../components/ui/cards/cards-component/cards-component.component';
import { CardData } from '../../../../components/ui/cards/cards-component/cards-component.model';
import { CardsComponentTableComponent } from '../../../../components/ui/cards/cards-component/cards-component-table/cards-component-table.component';
import { TableHeader } from '../../../../components/ui/cards/cards-component/cards-component-table/cards-component-table.model';
import { CardsComponentButtonComponent } from '../../../../components/ui/cards/cards-component/cards-component-button/cards-component-button.component';
import { ModalComponent } from '../../../../components/ui/modal/modal.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CardsComponentComponent, CardsComponentTableComponent, CardsComponentButtonComponent, ModalComponent],
  providers: [HttpClientModule, MemberService],
  templateUrl: './../../modules/members/members.component.html',
  styleUrl: './../../../dashboard/modules/members/members.component.css',
})
export class memberDashboardComponent implements OnInit {
  headerdsMapping: { [key: string]: string } = {
    name: 'Nombre',
    ci: 'CI',
    phone: 'Telefono',
  };
  // Properties for editing
  isEditing: boolean = false;
  editingMember: Member = {
    name: '',
    ci: '',
    phone: '',
    email: '',
    membershipType: '',
    status: 'active'
  };
  editingId: string = '';
  showModal: boolean = false;
  memberToDelete: Member | null = null;
  deleteMember(member: Member) {
    this.memberToDelete = member;
    this.showModal = true;
  }
  onConfirmDelete() {
    if (this.memberToDelete && this.memberToDelete.id) {
      this._memberService.delete(this.memberToDelete.id).subscribe({
        next: () => {
          console.log('Miembro eliminado');
          this.getAll();
          this.showModal = false;
        },
        error: (error) => {
          console.error('Error al eliminar el miembro:', error);
        }
      });
    }
  }
  onCancelDelete() {
    this.showModal = false;
  }
  // Remove any duplicate implementations of deleteMember
  // Only one implementation of handleKeyboardEvent
  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent() {
    this.isCreating = false;
    this.isEditing = false;
  }
  
  // Only one implementation of editMember
  editMember(member: Member) {
    this.editingMember = {...member};
    this.editingId = member.id || '';
    this.isEditing = true;
  }
  
  // Implementation of update method for the edit form
  updateMember() {
    if (this.editingId) {
      this._memberService.update(this.editingId, this.editingMember).subscribe({
        next: (data: Member) => {
          console.log('Member updated:', data);
          this.isEditing = false;
          this.getAll();
        },
        error: (error) => {
          console.error('Error updating member:', error);
        }
      });
    }
  }
  
  // Only one implementation of deleteMember
/*   deleteMember(member: Member) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${member.name}?`)) {
      if (member.id) {
        this._memberService.delete(member.id).subscribe({
          next: () => {
            console.log('Member deleted');
            this.getAll();
          },
          error: (error) => {
            console.error('Error deleting member:', error);
          }
        });
      }
    }
  } */
  
  // Method to close all modals
  closeModals() {
    this.isCreating = false;
    this.isEditing = false;
  }
  
  member: Member = {
    name: '',
    ci: '',
    phone: '',
    email: '',
    membershipType: '',
    status: 'active'
  };
  isCreating: boolean = false;
  data: CardData = {
    title: 'Gestion de usuarios',
    description:
      'Aqui podras ver y modificar los usuarios de la aplicacion, ten cuidado modificar erroneamente alguno de los datos podria llegar a causar problemas en el servidor o cliente.',
    descriptionIcon: 'warning',
    icon: 'settings',
    content: {
      table: {
        headers: Object.entries(this.headerdsMapping).map(([key, label]) => ({
          key,
          label
        })),
        data: [],
      },
    },
    Buttons: [
      {
        disabled: false,
        icon: 'server',
        action: () => {
          this.isCreating = true;
        },
        tooltip: ' Crear un nuevo usuario',
      },
      {
        title: 'exportar a excel',
        icon: 'excel',
        color: 'bg-green-500',
        textcolor: 'text-white',
        action: () => {
          this.exportToExcel();
        },
        tooltip: 'Exportar a excel',
      },
    ],
  };

  searchQuery: string = '';
  members: Member[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      ci: '1234567',
      phone: '555-0123',
      email: 'juan.perez@example.com',
      membershipType: 'Premium',
      status: 'active'
    },
    {
      id: '2',
      name: 'María González',
      ci: '7654321',
      phone: '555-4567',
      email: 'maria.g@example.com',
      membershipType: 'Básico',
      status: 'active'
    },
    {
      id: '3',
      name: 'Carlos Rodríguez',
      ci: '8901234',
      phone: '555-8901',
      email: 'carlos.r@example.com',
      membershipType: 'Premium',
      status: 'inactive'
    },
    {
      id: '4',
      name: 'Ana Martínez',
      ci: '5678901',
      phone: '555-2345',
      email: 'ana.m@example.com',
      membershipType: 'Premium',
      status: 'active'
    },
    {
      id: '5',
      name: 'Luis Torres',
      ci: '4567890',
      phone: '555-6789',
      email: 'luis.t@example.com',
      membershipType: 'Básico',
      status: 'active'
    },
    {
      id: '6',
      name: 'Carmen Silva',
      ci: '3456789',
      phone: '555-9012',
      email: 'carmen.s@example.com',
      membershipType: 'Premium',
      status: 'inactive'
    },
    {
      id: '7',
      name: 'Roberto Díaz',
      ci: '2345678',
      phone: '555-3456',
      email: 'roberto.d@example.com',
      membershipType: 'Básico',
      status: 'active'
    },
    {
      id: '8',
      name: 'Patricia López',
      ci: '9012345',
      phone: '555-7890',
      email: 'patricia.l@example.com',
      membershipType: 'Premium',
      status: 'active'
    },
    {
      id: '9',
      name: 'Miguel Sánchez',
      ci: '6789012',
      phone: '555-1234',
      email: 'miguel.s@example.com',
      membershipType: 'Básico',
      status: 'inactive'
    },
    {
      id: '10',
      name: 'Laura Ramírez',
      ci: '8901234',
      phone: '555-5678',
      email: 'laura.r@example.com',
      membershipType: 'Premium',
      status: 'active'
    }
  ];

  get filteredMembers() {
    return this.members.filter(member =>
      member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      member.ci.includes(this.searchQuery) ||
      member.phone.includes(this.searchQuery)
    );
  }

  tableHeaders: TableHeader[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'ci', label: 'CI' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'email', label: 'Email' },
    { key: 'membershipType', label: 'Membresía' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: '', width: 'w-[50px]' }
  ];

  constructor(private _memberService: MemberService) {}

  getHeadersMapping() {
    return this.headerdsMapping;
  }

  ngOnInit(): void {
    this.getAll();
    if (this.data?.content?.table) {
      this.data.content.table.data = this.members;
    }
  }
  
  navigateTomember(id: string) {
    window.location.href = `dashboard/members/${id}`;
  }

  getAll() {
    this._memberService.getAll().subscribe({
      next: (data: Member[]) => {
        console.log('members', data);
        this.members = data;
        if (this.data.content && this.data.content.table) {
          this.data.content.table.data = data;
        }
      },
      error: (error) => {
        console.error('Error fetching members:', error);
      }
    });
  }

  create() {
    this._memberService.create(this.member).subscribe((data: Member) => {
      this.members.push(data);
      this.resetmember();
      this.isCreating= false;
    });
  }
  
  getbyid(memberId: string) {
    this._memberService.getbyid(memberId).subscribe((data: Member) => {
      this.member = data;
    });
  }

  update(memberId: string) {
    this._memberService
      .update(memberId, this.member)
      .subscribe((data: Member) => {
        console.log(data);
        this.resetmember();
        this.getAll();
      });
  }

  delete(memberId: string) {
    this._memberService.delete(memberId).subscribe((data: void) => {
      console.log(data);
      this.getAll();
    });
  }
  
  cancel() {
    this.resetmember();
  }
  
  resetmember() {
    this.member = {
      name: '',
      ci: '',
      phone: '',
      email: '',
      membershipType: '',
      status: 'active'
    };
  }

  exportToExcel() {
    alert('Estamos trabajando en esta función...');
  }

  setCreating() {
    console.log('Boton Nuevo Miembro CLIC');
    this.isCreating = true;
  }
}
