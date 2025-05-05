import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Member } from '../models/member';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent {
  editedMember: Member;

  times = ['Morning', 'Afternoon', 'Evening'];

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public member: Member
  ) {
    // Create a copy so original data isn't modified until saved
    this.editedMember = { ...member };
  }

  updateProfile() {
    this.dialogRef.close(this.editedMember);
  }

  close() {
    this.dialogRef.close();
  }
}
