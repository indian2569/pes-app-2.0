import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoworkersComponent } from './coworkers.component';

describe('CoworkersComponent', () => {
  let component: CoworkersComponent;
  let fixture: ComponentFixture<CoworkersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoworkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
