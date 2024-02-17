import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);
  if (authService.isLoggedIn) {
    console.log('LOGGED');
  } else {
    router.navigateByUrl('');
  }
  return true;
};
