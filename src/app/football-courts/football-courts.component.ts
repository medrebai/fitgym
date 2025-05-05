import { Component, OnInit } from '@angular/core';
import { FootballCourtService } from '../services/football-court.service';
import { FootballCourt, Reservation } from '../models/football-court'; // <- make sure model has Reservation interface
import { MatDialog } from '@angular/material/dialog';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component'; // Adjust path if needed

@Component({
  selector: 'app-football-courts',
  templateUrl: './football-courts.component.html',
  styleUrls: ['./football-courts.component.css']
})
export class FootballCourtsComponent implements OnInit {

  footballCourts: FootballCourt[] = [];

  constructor(private footballCourtService: FootballCourtService,    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadFootballCourts();
  }

  loadFootballCourts() {
    this.footballCourtService.getFootballCourts().subscribe((courts) => {
      this.footballCourts = courts;
    });
  }

  deleteReservation(courtId: number, reservationId: number) {
    const court = this.footballCourts.find(c => c.id === courtId);
    if (court) {
      court.reservations = court.reservations?.filter(r => r.id !== reservationId);
      this.footballCourtService.updateFootballCourt(court).subscribe(() => {
        console.log('Reservation deleted successfully');
      });
    }
  }
  openAddReservationDialog(courtId: number): void {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      width: '400px',
      data: { courtId: courtId }
    });
  
    dialogRef.afterClosed().subscribe(newReservation => {
      if (newReservation) {
        const court = this.footballCourts.find(c => c.id === courtId);
        if (court) {
          if (!court.reservations) {
            court.reservations = [];
          }
          court.reservations.push(newReservation);
  
          this.footballCourtService.updateFootballCourt(court).subscribe(() => {
            console.log('Reservation added successfully!');
            this.loadFootballCourts(); 
          });
        }
      }
    });
  }
  
  
}