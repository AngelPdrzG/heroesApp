import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { CanActivateFn, CanMatchFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
      }
    })
  );
};

export const canActivateAuth: CanActivateFn = () => {
  return checkAuthStatus();
};

export const canMatchAuth: CanMatchFn = () => {
  return checkAuthStatus();
};
