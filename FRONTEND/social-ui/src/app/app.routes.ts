// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],

    children: [

      // ✅ Default → Feed
      { path: '', redirectTo: 'feed', pathMatch: 'full' },

      // 📰 Feed
      {
        path: 'feed',
        loadComponent: () =>
          import('./feed/feed.component')
            .then((m) => m.FeedComponent),
      },

      // ➕ Create Post
      {
        path: 'create',
        loadComponent: () =>
          import('./create-post/create-post.component')
            .then((m) => m.CreatePostComponent),
      },

      // 🔍 Search Users (NEW)
      {
        path: 'search',
        loadComponent: () =>
          import('./dashboard/search-users/search-users.component')
            .then((m) => m.SearchUsersComponent),
      },

    ],
  },

  // ❌ Invalid route fallback (optional but recommended)
  { path: '**', redirectTo: '' }
];
