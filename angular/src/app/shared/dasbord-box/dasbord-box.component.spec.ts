import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasbordBoxComponent } from './dasbord-box.component';

describe('DasbordBoxComponent', () => {
  let component: DasbordBoxComponent;
  let fixture: ComponentFixture<DasbordBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasbordBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DasbordBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
