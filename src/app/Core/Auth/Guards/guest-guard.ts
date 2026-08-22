import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('socialToken');
  const router = inject(Router);
  if (token) {
    return router.parseUrl('/feed');
  } else {
    return true;
  }
};
