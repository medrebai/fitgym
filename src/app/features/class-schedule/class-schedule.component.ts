import { Component, Input } from '@angular/core';
import { GymClass } from '../../models/class';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.css']
})
export class ClassScheduleComponent {
  @Input() weeklySchedule: any[] = [];
  @Input() classes: GymClass[] = [];
  @Input() coaches: { Coachid: number; name: string }[] = [];

  days: string[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  getClassAt(time: string, day: string): GymClass | null {
    return this.classes.find(c => {
      const classTime = new Date(c.time);
      const classHour = classTime.getHours().toString().padStart(2, '0') + ':00';
      const classDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][classTime.getDay()];
      return classHour === time && classDay === day;
    }) || null;
  }

  getCategoryColor(category?: string): string {
    const colors: any = {
      Yoga: '#C8E6C9',
      HIIT: '#FFCDD2',
      Cardio: '#BBDEFB',
      Dance: '#F8BBD0',
      Strength: '#FFE082'
    };
    return category && colors[category] ? colors[category] : '#E0E0E0';
  }

  getCoachName(coachId: number): string {
    return this.coaches.find(c => c.Coachid === coachId)?.name || 'Coach';
  }
  displayedColumns: string[] = ['time', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

}
