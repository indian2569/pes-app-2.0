import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllEntryComponent } from './all-entry.component';

describe('AllEntryComponent', () => {
  let component: AllEntryComponent;
  let fixture: ComponentFixture<AllEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
