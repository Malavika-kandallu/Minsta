import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnDestroy {
  username = '';
  password = '';
  private destroy$ = new Subject<void>();

  constructor(private api: ApiService, private router: Router) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signup() {
    if (!this.username || !this.password) {
      alert('Please fill all fields');
      return;
    }

    this.api.signup({ username: this.username, password: this.password })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          alert(res.message);
          this.router.navigate(['/login']);
        },
        error: (err) => alert(err.error.detail)
      });
  }
}
