import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Si hay token, permitimos el acceso
  if (authService.isAuthenticated()) {
    return true;
  }

  // Si no hay token, redirigimos al login
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url },
  });

  return false;
};
