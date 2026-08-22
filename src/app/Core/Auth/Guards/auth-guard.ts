import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('socialToken');
  const router = inject(Router);
  if (token) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
