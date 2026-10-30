import { TestBed } from '@angular/core/testing';

import { testProviders } from '../../testing/test-providers';
import { EntryService } from './entry.service';

describe('EntryService', () => {
  let service: EntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: testProviders });
    service = TestBed.inject(EntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
