import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService) {}

 signup() {
  this.auth.signup({
    username: this.username,
    password: this.password
  }).subscribe({
    next: (res: any) => {
      alert(res.message);   // ✅ message exists
    },
    error: (err) => {
      alert(err.error.detail); // ✅ detail exists
    }
  });
}

}
