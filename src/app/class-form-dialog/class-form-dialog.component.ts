import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoachService } from '../services/coach.service';
import { GymClass } from '../models/class';
import { Coach } from '../models/coach';

@Component({
  selector: 'app-class-form-dialog',
  templateUrl: './class-form-dialog.component.html'
})
export class ClassFormDialogComponent implements OnInit {
  classForm!: FormGroup;
  coaches: Coach[] = [];
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClassFormDialogComponent>,
    private coachSvc: CoachService,
    @Inject(MAT_DIALOG_DATA) public data?: GymClass
  ) {}

  ngOnInit() {
    this.coachSvc.getCoaches().subscribe(c => this.coaches = c);
    this.isEdit = !!this.data;

    this.classForm = this.fb.group({
      name:     [this.data?.name     || '', Validators.required],
      category: [this.data?.category || 'Yoga', Validators.required],
      coachId:  [this.data?.coachId  || null, Validators.required],
      time:     [this.data?.time     || '', Validators.required],
      price:    [this.data?.price    || 0, [Validators.required, Validators.min(0)]]
    });
  }

  submit() {
    if (this.classForm.invalid) return;
    const val = this.classForm.value;
    if (this.isEdit) {
      // preserve existing ID
      this.dialogRef.close({ id: this.data!.id, ...val });
    } else {
      this.dialogRef.close(val); // omit ID → JSON-server will assign
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}