import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/members/member.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Member } from '../../../core/models/member.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileUserCardComponent } from './profile-user-card/profile-user-card.component';
import { ModalComponent } from '../../../components/ui/modal/modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProfileUserCardComponent,
    ProfileUserCardComponent,
    ModalComponent,
  ],
  providers: [MemberService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  member: Member | undefined;
  error: string | null = null;
  isCardOpen: boolean = false;

  closeModal() {
    this.isCardOpen = false;
  }

  constructor(
    private _memberService: MemberService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this._memberService.getbyid(id).subscribe((data: Member) => {
        console.log(data);
        this.member = data;
      });
    });
  }
}
