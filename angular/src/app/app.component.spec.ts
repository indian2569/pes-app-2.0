import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { fakeJwt, testProviders } from '../testing/test-providers';
import { AppComponent } from './app.component';
import { TokenStorageService } from './_services/token-storage.service';
import { AuthUserDTO } from './model/AuthUserDTO';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let tokenStorage: TokenStorageService;

  const toolbarText = () => (fixture.nativeElement as HTMLElement).querySelector('mat-toolbar')?.textContent ?? '';

  beforeEach(async () => {
    window.sessionStorage.clear();
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule, MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, NgOptimizedImage],
      providers: testProviders
    }).compileComponents();

    tokenStorage = TestBed.inject(TokenStorageService);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  afterEach(() => window.sessionStorage.clear());

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('offers login and registration when nobody is logged in', () => {
    expect(toolbarText()).toContain('Prihlásiť sa');
    expect(toolbarText()).toContain('Zaregistrovať sa');
    expect(toolbarText()).not.toContain('Odhlásiť sa');
  });

  it('shows the user and the admin link after an admin logs in', () => {
    const admin: AuthUserDTO = { token: 'not-used', id: 1, username: 'admin', email: 'admin@test.com', roles: ['ROLE_USER', 'ROLE_ADMIN'] };
    tokenStorage.saveToken(fakeJwt(60));
    tokenStorage.saveUser(admin);
    fixture.detectChanges();

    expect(toolbarText()).toContain('Prihlásený ako: admin');
    expect(toolbarText()).toContain('Admin Board');
    expect(toolbarText()).not.toContain('Moderator Board');
  });
});
