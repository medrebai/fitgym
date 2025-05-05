import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClassService } from '../services/class.service';
import { CoachService } from '../services/coach.service';
import { FootballCourtService } from '../services/football-court.service';
import { SubscriptionService } from '../services/subscription.service';
import { AuthService } from '../services/auth.service';
import { MemberService } from '../services/member.service';

import { GymClass } from '../models/class';
import { Coach } from '../models/coach';
import { FootballCourt, Reservation } from '../models/football-court';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { ReservationModalComponent } from '../football-courts/reservation-modal/reservation-modal.component';
import { SubscriptionDialogComponent } from '../subscription-dialog/subscription-dialog.component';
import { Subscription } from '../models/subscription';

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
    private authService: AuthService,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if (user?.uid) {
        this.currentMemberId = user.uid;
      }
    });

    this.loadCourts();
    this.loadCoaches();
    this.loadClasses();
    this.initializeSchedule();
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  

  navigateToDashboard() {
    this.authService.getUser().subscribe(user => {
      if (!user?.uid) {
        this.router.navigate(['/login']);
        return;
      }

      this.authService.getUserRole(user.uid).then(role => {
        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.memberService.getMember(user.uid).subscribe(member => {
            const ref = this.dialog.open(ProfileDialogComponent, {
              width: '500px',
              data: member
            });

            ref.afterClosed().subscribe(updated => {
              if (updated) {
                this.memberService.updateMember(updated.id, updated).subscribe(() => {
                  this.snackBar.open('Profile updated!', 'Close', { duration: 3000 });
                });
              }
            });
          });
        }
      });
    });
  }

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

  loadCoaches() {
    this.coachSvc.getCoaches().subscribe(list => this.coaches = list);
  }

  loadCourts() {
    this.courtSvc.getFootballCourts().subscribe(list => this.footballCourts = list);
  }

  updateSelectedCourt(): void {
    const court = this.footballCourts.find(c => c.id === this.selectedCourtId);
    this.selectedCourtPrice = court ? court.pricePerHour : null;
  }

  openReservationDialog(): void {
    console.log('Court ID:', this.selectedCourtId);
    console.log('Date:', this.reservationDate);
    console.log('Start Time:', this.reservationStartTime);

    if (!this.selectedCourtId || !this.reservationDate || !this.reservationStartTime) {
      this.snackBar.open('Please fill in all reservation details.', 'Close', { duration: 3000 });
      return;
    }

    const selectedCourt = this.footballCourts.find(c => Number(c.id) === Number(this.selectedCourtId));
    if (!selectedCourt) {
      console.warn('Selected court not found.');
      return;
    }

    const isTaken = selectedCourt.reservations?.some(r =>
      r.date === this.reservationDate && r.startTime === this.reservationStartTime
    );

    if (isTaken) {
      this.snackBar.open('This time slot is already reserved.', 'Close', { duration: 3000 });
      return;
    }

    this.authService.getUser().subscribe(user => {
      if (!user?.uid) {
        this.router.navigate(['/login']);
        return;
      }

      this.memberService.getMember(user.uid).subscribe(member => {
        const ref = this.dialog.open(ReservationModalComponent, {
          width: '500px',
          data: {
            courtId: this.selectedCourtId,
            date: this.reservationDate,
            startTime: this.reservationStartTime,
            member
          }
        });

        ref.afterClosed().subscribe((result: any) => {
          if (!result?.reservation) return;

          selectedCourt.reservations = selectedCourt.reservations || [];
          selectedCourt.reservations.push(result.reservation);

          this.courtSvc.updateFootballCourt(selectedCourt).subscribe(() => {
            this.snackBar.open('Reservation saved!', 'Close', { duration: 3000 });
            this.loadCourts();
          });
        });
      });
    });
  }

  selectPlan(plan: 'basic' | 'premium' | 'platinum') {
    this.authService.getUser().subscribe(user => {
      if (!user?.uid) return;

      this.memberService.getMember(user.uid).subscribe(member => {
        const ref = this.dialog.open(SubscriptionDialogComponent, {
          width: '500px',
          data: { plan, member }
        });

        ref.afterClosed().subscribe((subscription: Subscription) => {
          if (subscription) {
            this.subscriptionSvc.addSubscription(subscription).subscribe(() => {
              this.snackBar.open('Subscription added!', 'Close', { duration: 3000 });
            });
          }
        });
      });
    });
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
  
}
