import { TestBed } from '@angular/core/testing';

import { LoggedUserProfileResolverService } from './logged-user-profile-resolver.service';

describe('LoggedUserProfileResolverService', () => {
  let service: LoggedUserProfileResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedUserProfileResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
