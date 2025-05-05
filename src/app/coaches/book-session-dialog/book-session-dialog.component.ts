import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { CoachService } from 'src/app/services/coach.service';
import { Coach, CoachSession } from 'src/app/models/coach';

@Component({
  selector: 'app-book-session-dialog',
  templateUrl: './book-session-dialog.component.html',
  styleUrls: ['./book-session-dialog.component.css']
})
export class BookSessionDialogComponent implements OnInit {
  session: CoachSession = {
    fullName: '',
    email: '',
    phone: '',
    weight: 0,
    height: 0,
    preferredTime: 'Morning',
    date: new Date().toISOString().slice(0, 10)
  };

  constructor(
    public dialogRef: MatDialogRef<BookSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public coach: Coach,
    private authService: AuthService,
    private coachService: CoachService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user?.email) this.session.email = user.email;
    });
  }

  submit() {
    if (!this.coach.sessions) this.coach.sessions = [];
    this.coach.sessions.push(this.session);
    this.coachService.updateCoach(this.coach).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
