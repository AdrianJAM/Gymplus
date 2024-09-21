import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'plan', 'startDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  ngOnInit() {
    // Inicializar datos
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addMember() {
    // Lógica para añadir miembro
  }

  editMember(member: any) {
    // Lógica para editar miembro
  }

  deleteMember(member: any) {
    // Lógica para eliminar miembro
  }
}