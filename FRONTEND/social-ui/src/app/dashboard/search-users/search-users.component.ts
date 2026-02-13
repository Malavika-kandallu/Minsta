import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnDestroy {
  searchText = '';
  users: any[] = [];
  currentUser = '';
  private destroy$ = new Subject<void>();

  constructor(private api: ApiService) {
    if (typeof window !== 'undefined') {
      this.currentUser = localStorage.getItem('username') || '';
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchUsers() {
    if (!this.searchText.trim()) return;

    this.api.searchUsers(this.searchText, this.currentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => this.users = res,
        error: (err) => console.error('Search error', err)
      });
  }

  follow(username: string) {
    this.api.follow(this.currentUser, username)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.users = this.users.map(u =>
          u.username === username ? { ...u, isFollowing: true } : u
        );
      });
  }

  unfollow(username: string) {
    this.api.unfollow(this.currentUser, username)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.users = this.users.map(u =>
          u.username === username ? { ...u, isFollowing: false } : u
        );
      });
  }
}
