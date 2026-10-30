import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testProviders } from '../../../testing/test-providers';
import { SharedModule } from '../shared.module';
import { TableCardComponent } from './table-card.component';

describe('TableCardComponent', () => {
  let component: TableCardComponent;
  let fixture: ComponentFixture<TableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [...testProviders]
    }).compileComponents();

    fixture = TestBed.createComponent(TableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
