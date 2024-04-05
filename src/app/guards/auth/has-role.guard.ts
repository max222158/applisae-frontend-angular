import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const hasRoleGuard: CanActivateFn = (route, state,) => {

  const router: Router = inject(Router);
  if (inject(AuthService).isLoggedIn()) {
    
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
