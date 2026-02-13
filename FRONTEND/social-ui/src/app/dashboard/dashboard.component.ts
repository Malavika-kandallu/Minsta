import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser = '';
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.currentUser = localStorage.getItem('username') || '';
    }

    if (this.router.url === '/dashboard') {
      this.router.navigate(['/dashboard/feed']);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
