// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'feed',
        loadComponent: () =>
          import('./feed/feed.component').then((m) => m.FeedComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./create-post/create-post.component').then(
            (m) => m.CreatePostComponent
          ),
      },
    ],
  },
];

