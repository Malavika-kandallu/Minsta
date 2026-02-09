import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      alert('Enter username & password');
      return;
    }

    console.log('Login:', this.username, this.password);

    // After API success → navigate
    localStorage.setItem('token', 'dummy-token');

    this.router.navigate(['/dashboard/feed']);
  }
}
