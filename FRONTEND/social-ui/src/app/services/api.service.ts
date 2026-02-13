import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // Auth APIs
  signup(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, data);
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  // Post APIs
  createPost(data: { username: string; content: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/posts`, data);
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/posts`);
  }

  getFeed(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/feed/${username}`);
  }

  // User APIs
  searchUsers(query: string, currentUser: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/users/search?q=${query}&currentUser=${currentUser}`
    );
  }

  follow(follower: string, following: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/follow`, { follower, following });
  }

  unfollow(follower: string, following: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/unfollow`, { follower, following });
  }
}
