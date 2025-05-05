import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../services/member.service';
import { Member } from '../models/member';

type Mode = 'add'|'edit';

@Component({
  selector: 'app-member-form-dialog',
  templateUrl: './member-form-dialog.component.html',
  styleUrls: ['./member-form-dialog.component.css']
})
export class MemberFormDialogComponent implements OnInit {
  form!: FormGroup;
  mode!: Mode;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberFormDialogComponent>,
    private svc: MemberService,
    @Inject(MAT_DIALOG_DATA)
    public data: { mode: Mode; member?: Member }
  ) {}

  ngOnInit() {
    this.mode = this.data.mode;
    this.form = this.fb.group({
      name:  [this.data.member?.name  || '', Validators.required],
      email: [this.data.member?.email || '', [Validators.required, Validators.email]],
      phone: [this.data.member?.phone || '', Validators.required]
    });
  }

  save() {
    if (this.form.invalid) return;
    const v = this.form.value;

    if (this.mode === 'add') {
      // no `id` here → JSON-Server assigns one
      this.svc.addMember(v).subscribe(() => this.dialogRef.close(true));
    } else {
      const upd: Member = { ...this.data.member!, ...v };
      this.svc.updateMember(Number(upd.id), upd).subscribe(() => this.dialogRef.close(true));
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
