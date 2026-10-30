import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testProviders } from '../../../testing/test-providers';
import { SharedModule } from '../shared.module';
import { DashboardBoxComponent } from './dashboard-box.component';

describe('DashboardBoxComponent', () => {
  let component: DashboardBoxComponent;
  let fixture: ComponentFixture<DashboardBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [...testProviders]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
