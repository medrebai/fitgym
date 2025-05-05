import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClassService } from '../services/class.service';
import { CoachService } from '../services/coach.service';
import { FootballCourtService } from '../services/football-court.service';
import { SubscriptionService } from '../services/subscription.service';
import { AuthService } from '../services/auth.service';

import { GymClass } from '../models/class';
import { Coach } from '../models/coach';
import { FootballCourt, Reservation } from '../models/football-court';
import { ReservationDialogComponent } from '../football-courts/reservation-dialog/reservation-dialog.component';

interface WeeklySlot {
  time: string;
  [key: string]: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Data for components
  classes: GymClass[] = [];
  filteredClasses: GymClass[] = [];
  selectedCategory = 'All';
  weeklySchedule: WeeklySlot[] = [];

  coaches: Coach[] = [];
  footballCourts: FootballCourt[] = [];

  selectedCourtId: number | null = null;
  selectedCourtPrice: number | null = null;
  reservationDate = '';
  reservationStartTime = '';

  currentMemberId: string = '';

  constructor(
    private classSvc: ClassService,
    private coachSvc: CoachService,
    private courtSvc: FootballCourtService,
    private subscriptionSvc: SubscriptionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if (user?.uid) {
        this.currentMemberId = user.uid;
      }
    });
  
    this.initializeSchedule();
    this.loadClasses();
    this.loadCoaches();
    this.loadCourts();
  }

  // ---- UI Event Handlers ----

  logout() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }

  navigateToDashboard() {
    this.authService.getUser().subscribe(user => {
      if (user?.uid) {
        this.authService.getUserRole(user.uid).then(role => {
          if (role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/profile']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // ---- Class Schedule ----

  initializeSchedule() {
    const times = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
    this.weeklySchedule = times.map(time => ({
      time,
      mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: ''
    }));
  }

  loadClasses() {
    this.classSvc.getClasses().subscribe(list => {
      this.classes = list;
      this.filterClassesByCategory(this.selectedCategory);
      this.populateSchedule();
    });
  }

  filterClassesByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredClasses = category === 'All'
      ? this.classes
      : this.classes.filter(c => c.category === category);
  }

  populateSchedule(): void {
    this.weeklySchedule.forEach(slot => {
      ['mon','tue','wed','thu','fri','sat','sun'].forEach(d => slot[d] = '');
      this.classes.forEach(c => {
        const dt = new Date(c.time);
        const key = ['sun','mon','tue','wed','thu','fri','sat'][dt.getDay()];
        const hr = dt.getHours().toString().padStart(2, '0') + ':00';
        if (slot.time === hr) slot[key] = c.name;
      });
    });
  }

  // ---- Coaches ----

  loadCoaches() {
    this.coachSvc.getCoaches().subscribe(list => this.coaches = list);
  }

  // ---- Courts & Reservation ----

  loadCourts() {
    this.courtSvc.getFootballCourts().subscribe(list => this.footballCourts = list);
  }

  updateSelectedCourt(): void {
    const court = this.footballCourts.find(c => c.id === this.selectedCourtId);
    this.selectedCourtPrice = court ? court.pricePerHour : null;
  }

  openReservationDialog(): void {
    if (!this.selectedCourtId) {
      this.snackBar.open('Please select a court first.', 'Close', { duration: 3000 });
      return;
    }

    const ref = this.dialog.open(ReservationDialogComponent, {
      width: '400px',
      data: { courtId: this.selectedCourtId }
    });

    ref.afterClosed().subscribe((newReservation: Reservation | undefined) => {
      if (!newReservation) return;

      const court = this.footballCourts.find(c => c.id === this.selectedCourtId);
      if (!court) return;

      court.reservations = court.reservations || [];
      court.reservations.push(newReservation);

      this.courtSvc.updateFootballCourt(court).subscribe(() => {
        this.snackBar.open('Reservation saved!', 'Close', { duration: 3000 });
        this.loadCourts();
      });
    });
  }

  // ---- Subscriptions ----

  selectPlan(planType: 'basic' | 'premium' | 'platinum') {
    const today = new Date();
    const start = today.toISOString().slice(0, 10);
    const endDate = new Date(today.setMonth(today.getMonth() + 1)).toISOString().slice(0, 10);
    const priceMap = { basic: 50, premium: 75, platinum: 100 } as const;

    this.subscriptionSvc.addSubscription({
      memberId: this.currentMemberId,
      type: planType,
      startDate: start,
      endDate,
      price: priceMap[planType]
    }).subscribe(() => {
      this.snackBar.open(`Subscribed to ${planType}!`, 'Close', { duration: 3000 });
    });
  }
  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  
}
