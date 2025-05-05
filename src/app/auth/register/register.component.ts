import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';
import { Member } from '../../models/member';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private memberService: MemberService,
    private router: Router
  ) {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.email, this.password)
      .then(({ uid }) => {
        const newMember: Member = {
          id: uid,                // UID from Firebase
          name: this.name,
          email: this.email,
          phone: this.phone
        };

        this.memberService.addMember(newMember).subscribe(() => {
          this.successMessage = 'Account created and saved!';
          this.router.navigate(['/home']);
        });
      })
      .catch(err => {
        this.errorMessage = err.message;
      });
  }
}
