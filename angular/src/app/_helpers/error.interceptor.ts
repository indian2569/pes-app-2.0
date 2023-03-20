import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../_services/token-storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
        catchError((err) => {
           if ([401, 403].includes(err.status) && (this.isAuthRequest(req) || this.token.getToken)) {
                // auto logout if 401 or 403 response returned from api
                console.log(err.status);
                this.token.signOut();
            }
          return throwError(err);
        })
      );
    }


    private isAuthRequest = (request) => request.url.includes('token');
}

export const errorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
]

