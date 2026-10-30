import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testProviders } from '../../../testing/test-providers';
import { SharedModule } from '../shared.module';
import { TableCollapseComponent } from './table-collapse.component';

describe('TableCollapseComponent', () => {
  let component: TableCollapseComponent;
  let fixture: ComponentFixture<TableCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [...testProviders]
    }).compileComponents();

    fixture = TestBed.createComponent(TableCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
