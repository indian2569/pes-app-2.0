import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testProviders } from '../../../testing/test-providers';
import { InfoModule } from '../info.module';
import { AboutStatisticComponent } from './about-statistic.component';

describe('AboutStatisticComponent', () => {
  let component: AboutStatisticComponent;
  let fixture: ComponentFixture<AboutStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoModule],
      providers: [...testProviders]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
