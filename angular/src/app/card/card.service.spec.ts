import { TestBed } from '@angular/core/testing';

import { testProviders } from '../../testing/test-providers';
import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: testProviders });
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
