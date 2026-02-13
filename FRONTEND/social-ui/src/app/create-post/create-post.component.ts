import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnDestroy {
  content = '';
  username = '';
  private destroy$ = new Subject<void>();

  constructor(private api: ApiService) {
    if (typeof window !== 'undefined') {
      this.username = localStorage.getItem('username') || '';
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

    this.api.createPost({ username: this.username, content: this.content })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          alert('Post created successfully ✅');
          this.content = '';
        },
        error: () => alert('Error creating post ❌')
      });
  }
}
