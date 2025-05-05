import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberService } from '../services/member.service';
import { Member } from '../models/member';
import { Subscription } from '../models/subscription';
import { Reservation } from '../models/football-court';

@Component({
  selector: 'app-member-details-dialog',
  templateUrl: './member-details-dialog.component.html',
  styleUrls: ['./member-details-dialog.component.css']
})
export class MemberDetailsDialogComponent implements OnInit {
  subscription: Subscription | null = null;
  reservations: Reservation[] = [];

  constructor(
    public dialogRef: MatDialogRef<MemberDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public member: Member,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.memberService.getMemberSubscription(Number(this.member.id)).subscribe(data => {
      this.subscription = Array.isArray(data) ? data[0] : data; 
    });

    this.memberService.getMemberReservations(Number(this.member.id)).subscribe(data => {
      this.reservations = data;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
