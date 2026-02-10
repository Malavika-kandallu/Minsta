import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ✅ Prevent SSR crash
  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  // ❌ Not logged in → redirect
  router.navigate(['/']);
  return false;
};
