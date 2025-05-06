import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassService } from '../services/class.service';
import { CoachService } from '../services/coach.service';
import { GymClass } from '../models/class';
import { Coach } from '../models/coach';
import { ClassFormDialogComponent } from '../class-form-dialog/class-form-dialog.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes: GymClass[] = [];
  coaches: Coach[] = [];
  displayedColumns = ['name','category','coachName','time','price','actions'];

  constructor(
    private classSvc: ClassService,
    private coachSvc: CoachService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadClasses();
    this.coachSvc.getCoaches().subscribe(c => this.coaches = c);
  }

  loadClasses() {
    this.classSvc.getClasses().subscribe(list => this.classes = list);
  }

  getCoachName(coachId: number): string {
    const coach = this.coaches.find(c => c.Coachid === coachId);
    return coach ? coach.name : 'Unknown';
  }

  openAddClassDialog() {
    this.openDialog();
  }

  openEditClassDialog(gymClass: GymClass) {
    this.openDialog(gymClass);
  }

  deleteClass(id: number) {
    this.classSvc.deleteClass(id).subscribe(() => this.loadClasses());
  }

  private openDialog(data?: GymClass) {
    const dialogRef = this.dialog.open(ClassFormDialogComponent, {
      width: '400px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      if ('id' in result) {
        this.classSvc.updateClass(result as GymClass)
          .subscribe(() => this.loadClasses());
      } else {
        this.classSvc.addClass(result as Omit<GymClass,'id'>)
          .subscribe(() => this.loadClasses());
      }
    });
  }
  
}