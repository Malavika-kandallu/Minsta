import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(`${this.api}/signup`, data);
  }

  login(data: any) {
    return this.http.post(`${this.api}/login`, data);
  }
}
