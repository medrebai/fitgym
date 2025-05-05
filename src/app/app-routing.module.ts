import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { MembersComponent } from './members/members.component';
import { ClassesComponent } from './classes/classes.component';
import { FootballCourtsComponent } from './football-courts/football-courts.component';
import { CoachesComponent } from './coaches/coaches.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';


// ✅ Import your guards
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  //{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard], // ✅ Only admins can enter
    children: [
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: 'members', component: MembersComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'football-courts', component: FootballCourtsComponent },
      { path: 'coaches', component: CoachesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
