import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: { username: string | null; password: string | null } = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  user: string = '';
  loading = false;
  
  onDestroy$ = new Subject();

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.isAuthenticated()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.user()?.roles ?? [];
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.loading = true;
    this.authService.login(username ?? '', password ?? '')
      .pipe(takeUntil(this.onDestroy$)).subscribe(
      data => {

        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.user()?.roles ?? [];
        this.user = username ?? '';
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.status === 401
          ? 'Nesprávne používateľské meno alebo heslo.'
          : err.status === 0 ? 'Server je nedostupný.' : (err.error?.message ?? err.message);
        this.isLoginFailed = true;
        this.loading = false;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  runHome(): void {
     this.router.navigate([`/home`]);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
