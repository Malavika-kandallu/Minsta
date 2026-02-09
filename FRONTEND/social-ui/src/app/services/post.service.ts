import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostService {
  api = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`${this.api}/posts`);
  }

  createPost(post: any) {
    return this.http.post(`${this.api}/posts`, post);
  }
}
