import {computed, Injectable, OnDestroy, signal} from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthUserDTO } from '../model/AuthUserDTO';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService implements OnDestroy {

  // 🔐 signals are the single source of truth; sessionStorage only persists them across page reloads
  private _token = signal<string | null>(null);
  private _user = signal<AuthUserDTO | null>(null);

  private jwtHelper = new JwtHelperService();
  // signs the user out when the token expires, so isAuthenticated() turns false without any request
  private expiryTimer?: ReturnType<typeof setTimeout>;

  // derived state
  isAuthenticated = computed(() => !!this._user() && !this.isExpired(this._token()));

  constructor(private router: Router) {
    this.restoreFromStorage();
  }

  // ===== public API (signals) =====

  token() {
    return this._token();
  }

  user() {
    return this._user();
  }


  signOut(): void {
    this.clear();
    this.router.navigate(['login']);
  }

  public saveToken(token: string): void {
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this._token.set(token);
    this.scheduleExpiry(token);
  }

  public saveUser(user: AuthUserDTO): void {
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this._user.set(user);
  }

  ngOnDestroy(): void {
    clearTimeout(this.expiryTimer);
  }

  private clear(): void {
    clearTimeout(this.expiryTimer);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    this._token.set(null);
    this._user.set(null);
  }

  private isExpired(token: string | null): boolean {
    if (!token) {
      return true;
    }
    try {
      return this.jwtHelper.isTokenExpired(token);
    } catch {
      // a token that can't be decoded is treated as expired
      return true;
    }
  }

  private scheduleExpiry(token: string): void {
    clearTimeout(this.expiryTimer);
    let expiresAt: Date | null = null;
    try {
      expiresAt = this.jwtHelper.getTokenExpirationDate(token);
    } catch {
      expiresAt = new Date(0);
    }
    if (expiresAt === null) {
      return;
    }
    // setTimeout delay is capped at ~24.8 days; backend tokens live 30 minutes
    const delay = Math.min(expiresAt.getTime() - Date.now(), 2_147_483_647);
    this.expiryTimer = setTimeout(() => this.signOut(), Math.max(delay, 0));
  }

  private restoreFromStorage(): void {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    const user = window.sessionStorage.getItem(USER_KEY);

    // a token that expired while the tab was closed is dropped instead of restored
    if (!token || this.isExpired(token)) {
      this.clear();
      return;
    }

    this._token.set(token);
    this.scheduleExpiry(token);

    if (user) {
      this._user.set(JSON.parse(user));
    }
  }
}
