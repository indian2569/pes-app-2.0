import {computed, Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  // 🔐 signals
  private _token = signal<string | null>(null);
  private _user = signal<any | null>(null);

  // derived state
  isAuthenticated = computed(() => !!this._user());

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
    window.sessionStorage.clear();
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['login']);
  }

  public saveToken(token: string): void {
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this._token.set(token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this._user.set(user);
  }

  private restoreFromStorage(): void {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    const user = window.sessionStorage.getItem(USER_KEY);

    if (token) {
      this._token.set(token);
    }

    if (user) {
      this._user.set(JSON.parse(user));
    }
  }
}
