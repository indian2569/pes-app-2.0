import { HttpClient, HttpContext, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';

import { TokenStorageService } from '../_services/token-storage.service';
import { errorInterceptorProviders, SKIP_ERROR_NOTIFICATION } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let http: HttpClient;
  let backend: HttpTestingController;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let token: jasmine.SpyObj<TokenStorageService>;

  beforeEach(() => {
    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    token = jasmine.createSpyObj<TokenStorageService>('TokenStorageService', ['token', 'signOut']);
    token.token.and.returnValue('a-token');

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
        errorInterceptorProviders,
        { provide: MatSnackBar, useValue: snackBar },
        { provide: TokenStorageService, useValue: token }
      ]
    });
    http = TestBed.inject(HttpClient);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => backend.verify());

  /** Sends a GET that the fake backend answers with the given status; returns the error the caller got. */
  function failWith(status: number, context?: HttpContext): unknown {
    let received: unknown;
    http.get('/api/test', { context }).subscribe({ error: e => received = e });
    backend.expectOne('/api/test').flush({ message: 'backend says no' }, { status, statusText: 'Error' });
    return received;
  }

  const lastMessage = () => snackBar.open.calls.mostRecent()?.args[0];

  it('logs out and says the session expired on 401', () => {
    failWith(401);

    expect(token.signOut).toHaveBeenCalled();
    expect(lastMessage()).toBe('Vaše prihlásenie vypršalo. Prihláste sa prosím znova.');
  });

  it('stays logged in on 403', () => {
    failWith(403);

    expect(token.signOut).not.toHaveBeenCalled();
    expect(lastMessage()).toBe('Na túto akciu nemáte oprávnenie.');
  });

  it('says the record was not found on 404', () => {
    failWith(404);

    expect(token.signOut).not.toHaveBeenCalled();
    expect(lastMessage()).toBe('Požadovaný záznam sa nenašiel.');
  });

  it('shows a generic server error on 500', () => {
    failWith(500);

    expect(lastMessage()).toBe('Na serveri nastala chyba. Skúste to prosím neskôr.');
  });

  it('shows the backend message for other client errors', () => {
    failWith(400);

    expect(lastMessage()).toBe('Chyba: backend says no');
  });

  it('shows nothing for a 401 without a session, the route guard handles it', () => {
    token.token.and.returnValue(null);

    failWith(401);

    expect(token.signOut).not.toHaveBeenCalled();
    expect(snackBar.open).not.toHaveBeenCalled();
  });

  it('leaves the message to the caller when the request opts out', () => {
    failWith(400, new HttpContext().set(SKIP_ERROR_NOTIFICATION, true));

    expect(snackBar.open).not.toHaveBeenCalled();
  });

  it('passes the original HttpErrorResponse on to the caller', () => {
    const error = failWith(404) as { status: number };

    expect(error.status).toBe(404);
  });
});
