// src/app/create-post/create-post.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  content: string = '';

  // ✅ Logged-in username
  username: string = '';

  constructor(private http: HttpClient) {
    // SSR safe localStorage access
    if (typeof window !== 'undefined') {
      this.username = localStorage.getItem('username') || '';
    }
  }

  submitPost() {
    if (!this.content.trim()) {
      alert('Post cannot be empty');
      return;
    }

    if (!this.username) {
      alert('User not logged in ❌');
      return;
    }

    const postData = {
      username: this.username,
      content: this.content,
    };

    this.http
      .post('http://localhost:8000/api/posts', postData)
      .subscribe({
        next: () => {
          alert('Post created successfully ✅');
          this.content = '';
        },
        error: (err) => {
          console.error('Post error:', err);
          alert('Error creating post ❌');
        },
      });
  }
}
