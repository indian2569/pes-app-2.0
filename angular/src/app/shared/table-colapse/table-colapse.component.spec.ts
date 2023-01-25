import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableColapseComponent } from './table-colapse.component';

describe('TableColapseComponent', () => {
  let component: TableColapseComponent;
  let fixture: ComponentFixture<TableColapseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableColapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
