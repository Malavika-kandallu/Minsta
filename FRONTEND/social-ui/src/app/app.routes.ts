import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      {
        path: 'feed',
        loadComponent: () => import('./feed/feed.component').then((m) => m.FeedComponent),
      },
      {
        path: 'create',
        loadComponent: () => import('./create-post/create-post.component').then((m) => m.CreatePostComponent),
      },
      {
        path: 'search',
        loadComponent: () => import('./dashboard/search-users/search-users.component').then((m) => m.SearchUsersComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'login' }
];
