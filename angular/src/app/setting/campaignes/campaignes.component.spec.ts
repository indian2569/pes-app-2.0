import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CampaignesComponent } from './campaignes.component';

describe('CampaignesComponent', () => {
  let component: CampaignesComponent;
  let fixture: ComponentFixture<CampaignesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
