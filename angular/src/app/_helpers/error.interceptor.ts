import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../_services/token-storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
           // 401 means the session is no longer valid, so log out; 403 only means this action is not allowed
           // for the user, the session stays and the caller handles the error
           if (err.status === HttpStatusCode.Unauthorized && this.token.token() !== null) {
                this.token.signOut();
            }
          return throwError(() => err);
        })
      );
    }
}

export const errorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
]
