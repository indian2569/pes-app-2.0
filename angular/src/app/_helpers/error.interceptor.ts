import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpStatusCode, HttpContextToken } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../_services/token-storage.service';
import { MessageResponseDTO } from '../model/MessageResponseDTO';

/**
 * Set on a request whose caller shows the error itself (e.g. login and register forms),
 * so the interceptor doesn't show a second, generic notification.
 */
export const SKIP_ERROR_NOTIFICATION = new HttpContextToken<boolean>(() => false);

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService,
              private snackBar: MatSnackBar) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
           const hadSession = this.token.token() !== null;
           // 401 means the session is no longer valid, so log out; 403 only means this action is not allowed
           // for the user, the session stays and the caller handles the error
           if (err.status === HttpStatusCode.Unauthorized && hadSession) {
                this.token.signOut();
            }
           if (!req.context.get(SKIP_ERROR_NOTIFICATION)) {
             this.notify(err, hadSession);
           }
          return throwError(err);
        })
      );
    }

    private notify(err: HttpErrorResponse, hadSession: boolean): void {
      const message = this.messageFor(err, hadSession);
      if (message) {
        this.snackBar.open(message, 'Zavrieť', { duration: 6000, panelClass: 'error-snackbar' });
      }
    }

    private messageFor(err: HttpErrorResponse, hadSession: boolean): string | null {
      switch (err.status) {
        case 0:
          return 'Server je nedostupný. Skontrolujte pripojenie a skúste to znova.';
        case HttpStatusCode.Unauthorized:
          // without a session the 401 comes from a guarded call made before login; the guard handles that
          return hadSession ? 'Vaše prihlásenie vypršalo. Prihláste sa prosím znova.' : null;
        case HttpStatusCode.Forbidden:
          return 'Na túto akciu nemáte oprávnenie.';
        case HttpStatusCode.NotFound:
          return 'Požadovaný záznam sa nenašiel.';
        default: {
          const backendMessage = (err.error as MessageResponseDTO | null)?.message;
          if (err.status >= 500) {
            return 'Na serveri nastala chyba. Skúste to prosím neskôr.';
          }
          return backendMessage ? `Chyba: ${backendMessage}` : 'Požiadavku sa nepodarilo spracovať.';
        }
      }
    }
}

export const errorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
]
