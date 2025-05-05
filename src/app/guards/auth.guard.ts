import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getUser().pipe(
      map(user => {
        if (user) {
          return true; // ✅ Authenticated
        } else {
          return this.router.createUrlTree(['/login']); // 🚫 Not authenticated
        }
      })
    );
  }
}
