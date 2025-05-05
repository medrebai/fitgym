import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';

    this.authService.login(this.email, this.password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid;

        if (!uid) {
          this.errorMessage = 'User ID not found.';
          return;
        }

        // Fetch role from Firestore
        this.authService.getUserRole(uid).then(role => {
          if (role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        }).catch(err => {
          console.error('Failed to get role:', err);
          this.router.navigate(['/home']);
        });

      })
      .catch(err => {
        this.errorMessage = err.message;
      });
  }
}
