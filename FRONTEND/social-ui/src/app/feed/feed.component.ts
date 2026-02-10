import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {

  posts: any[] = [];
  username: string = '';

  // Inject services
  private http = inject(HttpClient);
  private cd = inject(ChangeDetectorRef);

  // 🚀 Runs when feed loads
  ngOnInit() {

    // Browser-only guard (SSR safe)
    if (typeof window === 'undefined') return;

    // Get logged user
    this.username =
      localStorage.getItem('username') || '';

    if (!this.username) {
      console.warn('No logged-in user');
      return;
    }

    // Load feed after slight delay
    // (ensures router + DOM ready)
    setTimeout(() => {
      this.loadFeed();
    }, 0);
  }

  // 🔹 Load personalized feed
  loadFeed() {

    this.http
      .get<any[]>(
        `http://localhost:8000/api/feed/${this.username}`
      )
      .subscribe({

        next: (data) => {

          this.posts = data || [];

          // ⭐ Force UI render immediately
          this.cd.detectChanges();
        },

        error: (err) => {
          console.error('Feed load error:', err);
        },
      });
  }

  // 🔄 Manual refresh support
  refreshFeed() {
    this.loadFeed();
  }
}
