import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { AuthService } from '../services/auth.service';
import { Member } from '../models/member';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  member: Member | null = null;
  isLoading = true;

  constructor(
    private memberService: MemberService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user?.email) {
        this.memberService.getMembers().subscribe(members => {
          const found = members.find(m => m.email === user.email);
          if (found) this.member = found;
          this.isLoading = false;
        });
      }
    });
  }

  saveChanges(): void {
    if (this.member?.id) {
      this.memberService.updateMember(Number(this.member.id), this.member).subscribe(() => {
        alert('Profile updated!');
      });
    }
  }
}
