import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testProviders } from '../../../testing/test-providers';
import { EntryModule } from '../entry.module';
import { AllEntryComponent } from './all-entry.component';

describe('AllEntryComponent', () => {
  let component: AllEntryComponent;
  let fixture: ComponentFixture<AllEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryModule],
      providers: [...testProviders]
    }).compileComponents();

    fixture = TestBed.createComponent(AllEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
