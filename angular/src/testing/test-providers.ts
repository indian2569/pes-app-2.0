import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EnvironmentProviders, Provider } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

/**
 * What the app normally gets from AppModule: HTTP (answered by HttpTestingController instead of a server),
 * the router and animations (turned off so tests do not wait for them).
 */
export const testProviders: (Provider | EnvironmentProviders)[] = [
  provideHttpClient(),
  provideHttpClientTesting(),
  provideRouter([]),
  provideNoopAnimations()
];

/** An unsigned JWT that @auth0/angular-jwt can decode; negative seconds give an already expired token. */
export function fakeJwt(expiresInSeconds: number): string {
  const encode = (part: object) => btoa(JSON.stringify(part)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode({ sub: 'test', exp })}.signature`;
}

/** For components opened through MatDialog.open(). */
export function dialogProviders(data: unknown = {}): Provider[] {
  return [
    { provide: MatDialogRef, useValue: jasmine.createSpyObj<MatDialogRef<unknown>>('MatDialogRef', ['close']) },
    { provide: MAT_DIALOG_DATA, useValue: data }
  ];
}
