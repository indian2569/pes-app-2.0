import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private tokenService: TokenStorageService,
    private router: Router,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.tokenService.getUser().username !== undefined) {
      return of(true);
    }
    return this.navigateToLoginPage();
  }

  private navigateToLoginPage(): Observable<boolean> {
    this.router.navigate(['login']);
    return of(false);
  }

}
