import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testProviders } from '../../../testing/test-providers';
import { SettingModule } from '../setting.module';
import { MethodsComponent } from './methods.component';

describe('MethodsComponent', () => {
  let component: MethodsComponent;
  let fixture: ComponentFixture<MethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingModule],
      providers: [...testProviders]
    }).compileComponents();

    fixture = TestBed.createComponent(MethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
