import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coach } from '../../models/coach';
import { CoachService } from '../../services/coach.service';

@Component({
  selector: 'app-add-coach-dialog',
  templateUrl: './add-coach-dialog.component.html',
  styleUrls: ['./add-coach-dialog.component.css']
})
export class AddCoachDialogComponent {
  addCoachForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCoachDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private coachService: CoachService
  ) {
    this.addCoachForm = this.fb.group({
      name: ['', Validators.required],
      specialty: ['', Validators.required],
      experience: [0, Validators.required],
      iconUrl: ['']
    });
  }

  addCoach(): void {
    if (this.addCoachForm.valid) {
      const newCoach: Coach = this.addCoachForm.value;
      this.coachService.addCoach(newCoach).subscribe((coach) => {
        console.log('New coach added:', coach);
        this.dialogRef.close(coach); // Close the dialog and send the new coach back to the parent
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close the dialog without doing anything
  }
}
