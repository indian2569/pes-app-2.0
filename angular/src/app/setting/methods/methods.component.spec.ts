import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MethodsComponent } from './methods.component';

describe('MethodsComponent', () => {
  let component: MethodsComponent;
  let fixture: ComponentFixture<MethodsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
