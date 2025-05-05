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
  @Output() selectedCourtPriceChange = new EventEmitter<number>();
  @Output() reservationDateChange = new EventEmitter<string>();
  @Output() reservationStartTimeChange = new EventEmitter<string>();
  @Output() openReservationDialogClicked = new EventEmitter<void>();

  onCourtChange(value: string) {
    const id = +value;
    this.selectedCourtIdChange.emit(id);

    const selectedCourt = this.footballCourts.find(c => c.id === id);
    const price = selectedCourt?.pricePerHour ?? undefined;
    this.selectedCourtPriceChange.emit(price);
  }

  onDateChange(value: string) {
    this.reservationDateChange.emit(value);
  }

  onTimeChange(value: string) {
    this.reservationStartTimeChange.emit(value);
  }

  openDialog() {
    this.openReservationDialogClicked.emit();
  }
}
