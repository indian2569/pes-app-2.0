import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testProviders } from '../../../testing/test-providers';
import { EntryModule } from '../entry.module';
import { EntryComponent } from './entry.component';

describe('EntryComponent', () => {
  let component: EntryComponent;
  let fixture: ComponentFixture<EntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryModule],
      providers: [...testProviders]
    }).compileComponents();

    fixture = TestBed.createComponent(EntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
