import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: false
})
export class RegisterComponent implements OnDestroy {
  form: { username: string | null; email: string | null; password: string | null } = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  onDestroy$ = new Subject();

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username ?? '', email ?? '', password ?? '').pipe(takeUntil(this.onDestroy$))
    .subscribe(
      () => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message ?? err.message;
        this.isSignUpFailed = true;
      }
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
