import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testProviders } from '../../../testing/test-providers';
import { SettingModule } from '../setting.module';
import { CampaignesComponent } from './campaignes.component';

describe('CampaignesComponent', () => {
  let component: CampaignesComponent;
  let fixture: ComponentFixture<CampaignesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingModule],
      providers: [...testProviders]
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
