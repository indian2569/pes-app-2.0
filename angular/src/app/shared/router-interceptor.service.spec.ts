import { TestBed } from '@angular/core/testing';

import { testProviders } from '../../testing/test-providers';
import { RouterInterceptorService } from './router-interceptor.service';

describe('RouterInterceptorService', () => {
  let service: RouterInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: testProviders });
    service = TestBed.inject(RouterInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
