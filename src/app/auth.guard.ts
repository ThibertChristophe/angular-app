import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);
  const dialog: MatDialog = inject(MatDialog);

  if (authService.isLoggedIn) {
    console.log('LOGGED');
  } else {
    dialog.open(PopupComponent);

    router.navigateByUrl('');
  }
  return true;
};
