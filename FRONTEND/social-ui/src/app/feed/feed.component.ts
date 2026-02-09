import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feed.component.html'
})
export class FeedComponent {
  posts = [
    { username: 'alice', content: 'Hello world' },
    { username: 'bob', content: 'Angular standalone works!' }
  ];

  content = '';

  post() {
    if (this.content.trim()) {
      this.posts.unshift({
        username: 'testuser',
        content: this.content
      });
      this.content = '';
    }
  }
}
