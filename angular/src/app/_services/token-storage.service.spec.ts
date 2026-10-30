import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';

import { fakeJwt, testProviders } from '../../testing/test-providers';
import { AuthUserDTO } from '../model/AuthUserDTO';
import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  const user: AuthUserDTO = { token: 'not-used', id: 1, username: 'test', email: 'test@test.com', roles: ['ROLE_USER'] };

  function createService(): TokenStorageService {
    TestBed.configureTestingModule({ providers: testProviders });
    return TestBed.inject(TokenStorageService);
  }

  beforeEach(() => window.sessionStorage.clear());
  afterEach(() => window.sessionStorage.clear());

  it('is not authenticated without a session', () => {
    expect(createService().isAuthenticated()).toBeFalse();
  });

  it('is authenticated with a valid token and a user', () => {
    const service = createService();
    service.saveToken(fakeJwt(60));
    service.saveUser(user);

    expect(service.isAuthenticated()).toBeTrue();
    expect(service.user()?.username).toBe('test');
  });

  it('does not count an expired token as logged in', () => {
    const service = createService();
    service.saveToken(fakeJwt(-60));
    service.saveUser(user);

    expect(service.isAuthenticated()).toBeFalse();
  });

  it('does not count an unreadable token as logged in', () => {
    const service = createService();
    service.saveToken('not-a-jwt');
    service.saveUser(user);

    expect(service.isAuthenticated()).toBeFalse();
  });

  it('restores a valid session after a page reload', () => {
    window.sessionStorage.setItem('auth-token', fakeJwt(60));
    window.sessionStorage.setItem('auth-user', JSON.stringify(user));

    const service = createService();

    expect(service.isAuthenticated()).toBeTrue();
  });

  it('drops a session whose token expired while the tab was closed', () => {
    window.sessionStorage.setItem('auth-token', fakeJwt(-60));
    window.sessionStorage.setItem('auth-user', JSON.stringify(user));

    const service = createService();

    expect(service.token()).toBeNull();
    expect(window.sessionStorage.getItem('auth-user')).toBeNull();
  });

  it('clears the session and goes to login on signOut', () => {
    const service = createService();
    const navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
    service.saveToken(fakeJwt(60));
    service.saveUser(user);

    service.signOut();

    expect(service.isAuthenticated()).toBeFalse();
    expect(window.sessionStorage.getItem('auth-token')).toBeNull();
    expect(navigate).toHaveBeenCalledWith(['login']);
  });

  it('signs out by itself when the token expires', fakeAsync(() => {
    const service = createService();
    spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
    service.saveToken(fakeJwt(5));
    service.saveUser(user);

    tick(6000);

    expect(service.token()).toBeNull();
  }));
});
