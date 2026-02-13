import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  password = '';
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      this.router.navigate(['/dashboard/feed']);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login() {
    if (!this.username || !this.password) {
      alert('Enter username & password');
      return;
    }

    this.api.login({ username: this.username, password: this.password })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', this.username);
          this.router.navigate(['/dashboard/feed']);
        },
        error: () => alert('Invalid credentials ❌')
      });
  }

}
