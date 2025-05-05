import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getUser().pipe(
      switchMap(user => {
        if (!user) {
          // Not logged in → redirect to /login
          return of(this.router.createUrlTree(['/login']));
        }
        // Get role and check if admin
        return from(this.authService.getUserRole(user.uid)).pipe(
          map(role => {
            return role === 'admin'
              ? true
              : this.router.createUrlTree(['/home']); // Not admin → go to home
          }),
          catchError(() => of(this.router.createUrlTree(['/home']))) // In case of error
        );
      })
    );
  }
}
