import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/api/auth/auth.service';
import { inject } from '@angular/core';

export const AuthGard: CanActivateFn = (route, state,) => {

  const router: Router = inject(Router);
  if (inject(AuthService).isLoggedIn()) { 

    
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
