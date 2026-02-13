import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { HighlightDirective } from '../directives/highlight.directive';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, HighlightDirective],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit, OnDestroy {
  posts: any[] = [];
  username = '';
  private destroy$ = new Subject<void>();

  constructor(
    private api: ApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (typeof window === 'undefined') return;

    this.username = localStorage.getItem('username') || '';

    if (!this.username) return;

    setTimeout(() => this.loadFeed(), 0);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadFeed() {
    this.api.getFeed(this.username)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.posts = data || [];
          this.cd.detectChanges();
        },
        error: (err) => console.error('Feed load error:', err)
      });
  }

  refreshFeed() {
    this.loadFeed();
  }
}
