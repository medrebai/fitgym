import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoachService } from '../services/coach.service';
import { AddCoachDialogComponent } from './add-coach-dialog/add-coach-dialog.component'; // Import the dialog component
import { Coach } from '../models/coach';


@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {
  coaches: Coach[] = [];  // List of coaches

  constructor(
    private coachService: CoachService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCoaches();
  }

  loadCoaches() {
    this.coachService.getCoaches().subscribe((data) => {
      this.coaches = data;
    });
  }

  // Method to open the dialog and add a new coach
  openAddCoachForm(): void {
    const dialogRef = this.dialog.open(AddCoachDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coaches.push(result); // Add the new coach to the list
      }
    });
  }

  // Delete a coach
  deleteCoach(Coachid: number): void {
    this.coachService.deleteCoach(Coachid).subscribe(() => {
      console.log('Coach deleted');
      this.coaches = this.coaches.filter(coach => coach.Coachid !== Coachid); // Remove coach from list
    });
  }
}
