import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ClassesComponent } from './classes/classes.component';
import { FootballCourtsComponent } from './football-courts/football-courts.component';
import { MembersComponent } from './members/members.component';
import { CoachesComponent } from './coaches/coaches.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberFormDialogComponent } from './member-form-dialog/member-form-dialog.component';
import { ClassFormDialogComponent } from './class-form-dialog/class-form-dialog.component';
import { ReservationDialogComponent } from './football-courts/reservation-dialog/reservation-dialog.component';
import { AddCoachDialogComponent } from './coaches/add-coach-dialog/add-coach-dialog.component';
import { HomeComponent } from './home/home.component';
import { MemberDetailsDialogComponent } from './member-details-dialog/member-details-dialog.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { ClassScheduleComponent } from './features/class-schedule/class-schedule.component';
import { MembershipPlansComponent } from './features/membership-plans/membership-plans.component';
import { FacilitiesComponent } from './features/facilities/facilities.component';
import { CoachListComponent } from './features/coach-list/coach-list.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BookSessionDialogComponent } from './coaches/book-session-dialog/book-session-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { SubscriptionDialogComponent } from './subscription-dialog/subscription-dialog.component';
import { SubscriptionSummaryDialogComponent } from './subscription-summary-dialog/subscription-summary-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SubscriptionsComponent,
    ClassesComponent,
    FootballCourtsComponent,
    MembersComponent,
    CoachesComponent,
    DashboardComponent,
    MemberFormDialogComponent,
    ClassFormDialogComponent,
    ReservationDialogComponent,
    AddCoachDialogComponent,
    HomeComponent,
    MemberDetailsDialogComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ToolbarComponent,
    ClassScheduleComponent,
    MembershipPlansComponent,
    FacilitiesComponent,
    CoachListComponent,
    FooterComponent,
    BookSessionDialogComponent,
    ProfileDialogComponent,
    SubscriptionDialogComponent,
    SubscriptionSummaryDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    
    // Material
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatOptionModule,
    MatTooltipModule,
    CommonModule,

    // Firestore
    AngularFirestoreModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
