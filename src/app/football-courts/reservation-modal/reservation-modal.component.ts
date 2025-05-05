import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from '../../models/member';
import { Reservation } from '../../models/football-court';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css']
})
export class ReservationModalComponent {
  member: Member;
  date: string;
  startTime: string;
  courtId: number;

  numberOfPlayers: number = 10;
  equipment: { ball: boolean; bibs: boolean; cones: boolean } = {
    ball: false,
    bibs: false,
    cones: false
  };
  remarks: string = '';

  constructor(
    private dialogRef: MatDialogRef<ReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.member = data.member;
    this.date = data.date;
    this.startTime = data.startTime;
    this.courtId = data.courtId;
  }

  confirm() {
    const endTime = this.calculateEndTime(this.startTime);
    const reservation: Reservation = {
      id: Date.now(),
      memberId: Number(this.member.id),
      date: this.date,
      startTime: this.startTime,
      endTime
    };

    this.dialogRef.close({
      reservation,
      equipment: this.equipment,
      remarks: this.remarks,
      numberOfPlayers: this.numberOfPlayers
    });
  }

  close() {
    this.dialogRef.close();
  }

  private calculateEndTime(start: string): string {
    const [hour, minute] = start.split(':').map(Number);
    const endHour = hour + 2;
    return `${endHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }
}
