import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  let userData: any = sessionStorage.getItem('userInfo') || null;

  userData && (userData = JSON.parse(userData));

  if (userData && userData.user) {
    return true;
  }

  router.navigate(['login']);
  return false;
};
