import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // 🔍 Search Users
  searchUsers(username: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/users/search?username=${username}`
    );
  }

  // ➕ Follow
  follow(username: string) {
    return this.http.post(
      `${this.baseUrl}/follow/${username}`, {}
    );
  }

  // ➖ Unfollow
  unfollow(username: string) {
    return this.http.delete(
      `${this.baseUrl}/unfollow/${username}`
    );
  }
}
