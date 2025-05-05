import { Component, Input, OnInit } from '@angular/core';
import { Coach } from '../../models/coach';
import { MatDialog } from '@angular/material/dialog';
import { BookSessionDialogComponent } from 'src/app/coaches/book-session-dialog/book-session-dialog.component';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.css']
})
export class CoachListComponent implements OnInit {
  @Input() coaches: Coach[] = [];
  bookedCoachIds = new Set<number>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('bookedCoachIds');
    if (saved) {
      this.bookedCoachIds = new Set(JSON.parse(saved));
    }
  }

  bookSession(coach: Coach) {
    const dialogRef = this.dialog.open(BookSessionDialogComponent, {
      width: '400px',
      data: coach
    });

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.bookedCoachIds.add(coach.Coachid);
        localStorage.setItem('bookedCoachIds', JSON.stringify([...this.bookedCoachIds]));
      }
    });
  }

  isBooked(coachId: number): boolean {
    return this.bookedCoachIds.has(coachId);
  }
}
