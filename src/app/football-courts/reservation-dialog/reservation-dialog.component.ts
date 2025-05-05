import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent {
  memberName: string = '';
  reservationDate: string = '';
  reservationStartTime: string = '';
  reservationEndTime: string = '';

  constructor(
    public dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addReservation(): void {
    const newReservation = {
      id: Date.now(), // generate unique id
      date: this.reservationDate,
      startTime: this.reservationStartTime,
      endTime: this.reservationEndTime,
      memberId: Math.floor(Math.random() * 1000) + 1 // generate random fake memberId for now
    };

    this.dialogRef.close(newReservation); 
  }
}
