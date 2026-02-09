// src/app/create-post/create-post.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  content: string = '';

  submitPost() {
    if (!this.content.trim()) {
      alert('Post cannot be empty');
      return;
    }

    // For now just log — later connect to backend
    console.log('Post submitted:', this.content);

    alert('Post created successfully ✅');

    // Clear textarea
    this.content = '';
  }
}
