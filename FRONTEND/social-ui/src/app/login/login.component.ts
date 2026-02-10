import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  login() {
    if (!this.username || !this.password) {
      alert('Enter username & password');
      return;
    }

    const loginData = {
      username: this.username,
      password: this.password,
    };

    // 🔹 Call FastAPI login API
    this.http
      .post<any>('http://localhost:8000/auth/login', loginData)
      .subscribe({
        next: (res) => {
          console.log('Login success:', res);

          // ✅ Store JWT token
          localStorage.setItem('token', res.token);

          // ✅ Store logged-in username
          localStorage.setItem('username', this.username);

          // Navigate to dashboard
          this.router.navigate(['/dashboard/feed']);
        },
        error: (err) => {
          console.error(err);
          alert('Invalid credentials ❌');
        },
      });
  }
}
