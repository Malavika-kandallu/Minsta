import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent {

  searchText = '';
  users: any[] = [];
  currentUser = localStorage.getItem('username');

  // 🔍 Search
  searchUsers() {
    console.log('Searching for:', this.searchText);

    // TEMP MOCK DATA (for testing UI)
    this.users = [
      { username: 'john', isFollowing: false },
      { username: 'alice', isFollowing: true },
      { username: 'mike', isFollowing: false }
    ];
  }

  // ➕ Follow
  follow(username: string) {
    console.log('Follow', username);

    this.users = this.users.map(u =>
      u.username === username
        ? { ...u, isFollowing: true }
        : u
    );
  }

  // ➖ Unfollow
  unfollow(username: string) {
    console.log('Unfollow', username);

    this.users = this.users.map(u =>
      u.username === username
        ? { ...u, isFollowing: false }
        : u
    );
  }
}
