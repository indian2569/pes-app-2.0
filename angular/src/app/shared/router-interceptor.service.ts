import { Injectable } from '@angular/core';
import { NavigationError } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterInterceptorService {

  private targetUrl: string;

  constructor() {
    this.targetUrl = location.href;
   }

   handleEvent(event): void {
    if (event instanceof NavigationError && event.error.status === 401) {
      const redirectUrl: string = event.error.headers.get('sso-login-url');
      if (redirectUrl) {
        this.handleUnauthentificated(redirectUrl);
      } else {
        console.error('No redirect URL find.');
      }
    }
  }

  private handleUnauthentificated(redirectUrl: string): void {
    location.replace(`${redirectUrl}?goto=${this.targetUrl}`);
  }
}
