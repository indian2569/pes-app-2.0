import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testProviders } from '../../../testing/test-providers';
import { SettingModule } from '../setting.module';
import { CoworkersComponent } from './coworkers.component';

describe('CoworkersComponent', () => {
  let component: CoworkersComponent;
  let fixture: ComponentFixture<CoworkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingModule],
      providers: [...testProviders]
    }).compileComponents();

    fixture = TestBed.createComponent(CoworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
