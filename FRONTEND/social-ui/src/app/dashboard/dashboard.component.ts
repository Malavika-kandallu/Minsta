import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  searchText = '';
  users: any[] = [];
  currentUser = '';

  searchError: string = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  // ✅ Load feed automatically
  ngOnInit() {

    if (typeof window !== 'undefined') {
      this.currentUser =
        localStorage.getItem('username') || '';
    }

    // Auto redirect if empty child route
    if (this.router.url === '/dashboard') {
      this.router.navigate(['/dashboard/feed']);
    }
  }

  // 🚪 Logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

searchUsers() {

  const query = this.searchText.trim();

  // ❌ Empty input validation
  if (!query) {

    this.searchError =
      'Please enter a username to search';

    // Clear previous results
    this.users = [];

    return;
  }

  // ✅ Clear error if valid input
  this.searchError = '';

  // 🔍 Call API
  this.http
    .get<any[]>(
      `http://localhost:8000/api/users/search?q=${query}&currentUser=${this.currentUser}`
    )
    .subscribe({

      next: (data) => {
        this.users = data;
      },

      error: (err) => {
        console.error('Search error:', err);
      }
    });
}



  // ➕ Follow
follow(username: string) {

  this.http
    .post('http://localhost:8000/api/follow', {
      follower: this.currentUser,
      following: username,
    })
    .subscribe(() => {

      alert(`You and ${username} are now friends!`);

            // Update UI instantly
      const user = this.users.find(
        u => u.username === username
      );

      if (user) user.isFollowing = true;
      // ✅ Clear search UI
      this.resetSearchUI();

      // 🔄 Refresh feed only
      this.reloadFeed();
    });
}


// ➖ Unfollow
unfollow(username: string) {

  this.http
    .post('http://localhost:8000/api/unfollow', {
      follower: this.currentUser,
      following: username,
    })
    .subscribe(() => {

      alert(`Unfollowed ${username}`);

            const user = this.users.find(
        u => u.username === username
      );

      if (user) user.isFollowing = false;
      // ✅ Clear search UI
      this.resetSearchUI();

      // 🔄 Refresh feed
      this.reloadFeed();
    });
}


// 🧹 Reset search input + results
resetSearchUI() {

  this.searchText = '';
  this.users = [];

}


  // 🔄 Reload feed without full page refresh
reloadFeed() {
  this.router.navigateByUrl('/dashboard', { skipLocationChange: true })
    .then(() => {
      this.router.navigate(['/dashboard/feed']);
    });
}

}
