import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testProviders } from '../../../testing/test-providers';
import { SettingModule } from '../setting.module';
import { InstitutionsComponent } from './institutions.component';

describe('InstitutionsComponent', () => {
  let component: InstitutionsComponent;
  let fixture: ComponentFixture<InstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingModule],
      providers: [...testProviders]
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
