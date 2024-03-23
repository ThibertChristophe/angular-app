import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
import { JWTTokenService } from './services/auth/JWTToken.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const dialog: MatDialog = inject(MatDialog);
  const jwtService: JWTTokenService = inject(JWTTokenService);
  const jwt: string | null = localStorage.getItem('jwt') ?? null;

  if (jwt) {
    jwtService.setToken(jwt);
    if (jwtService.isTokenExpired()) {
      localStorage.removeItem('jwt');
      jwtService.setToken('');
      dialog.open(PopupComponent);
      router.navigateByUrl('');
      return false;
    }
  } else {
    dialog.open(PopupComponent);
    router.navigateByUrl('');
    return false;
  }
  return true;
};
