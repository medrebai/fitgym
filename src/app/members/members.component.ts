// src/app/members/members.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MemberService } from '../services/member.service';
import { Member } from '../models/member';
import { MemberFormDialogComponent } from '../member-form-dialog/member-form-dialog.component';
import { MemberDetailsDialogComponent } from '../member-details-dialog/member-details-dialog.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  displayedColumns = ['id', 'name', 'email', 'phone', 'actions'];

  constructor(
    private svc: MemberService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.load();
  }

  private load() {
    this.svc.getMembers().subscribe(list => this.members = list);
  }

  openAdd() {
    const ref = this.dialog.open(MemberFormDialogComponent, {
      width: '400px',
      data: { mode: 'add' as const }
    });
    ref.afterClosed().subscribe(ok => ok && this.load());
  }

  openEdit(m: Member) {
    const ref = this.dialog.open(MemberFormDialogComponent, {
      width: '400px',
      data: { mode: 'edit' as const, member: m }
    });
    ref.afterClosed().subscribe(ok => ok && this.load());
  }

  delete(id: number) {
    if (!confirm('Really delete?')) return;
    this.svc.deleteMember(id).subscribe(() => this.load());
  }

  openDetails(m: Member) {
    this.dialog.open(MemberDetailsDialogComponent, {
      width: '500px',
      data: m
    });
  }
}
