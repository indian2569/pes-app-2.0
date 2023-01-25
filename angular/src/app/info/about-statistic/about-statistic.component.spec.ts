import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutStatisticComponent } from './about-statistic.component';

describe('AboutStatisticComponent', () => {
  let component: AboutStatisticComponent;
  let fixture: ComponentFixture<AboutStatisticComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
