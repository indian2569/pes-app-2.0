import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testProviders } from '../../../testing/test-providers';
import { CardModule } from '../card.module';
import { AllCardsComponent } from './all-cards.component';

describe('AllCardsComponent', () => {
  let component: AllCardsComponent;
  let fixture: ComponentFixture<AllCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule],
      providers: [...testProviders]
    }).compileComponents();

    fixture = TestBed.createComponent(AllCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
