import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FootballCourt } from '../../models/football-court';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent {
  @Input() footballCourts: FootballCourt[] = [];
  @Input() selectedCourtId: number | null = null;
  @Input() selectedCourtPrice: number | null = null;
  @Input() reservationDate: string = '';
  @Input() reservationStartTime: string = '';

  @Output() selectedCourtIdChange = new EventEmitter<number>();
  @Output() reservationDateChange = new EventEmitter<string>();
  @Output() reservationStartTimeChange = new EventEmitter<string>();
  @Output() openReservationDialogClicked = new EventEmitter<void>();

  onCourtChange(event: any) {
    this.selectedCourtIdChange.emit(event.target.value);
  }

  onDateChange(event: any) {
    this.reservationDateChange.emit(event.target.value);
  }

  onTimeChange(event: any) {
    this.reservationStartTimeChange.emit(event.target.value);
  }

  openDialog() {
    this.openReservationDialogClicked.emit();
  }
}
