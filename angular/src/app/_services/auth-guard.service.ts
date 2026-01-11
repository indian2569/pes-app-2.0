import {inject} from '@angular/core';
import {

  CanActivateFn,
  Router
} from '@angular/router';

import { TokenStorageService } from './token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenStorageService);
  const router = inject(Router);

  if (tokenService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['login']);
};
