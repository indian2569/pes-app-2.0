import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableEntryComponent } from './table-entry.component';

describe('TableEntryComponent', () => {
  let component: TableEntryComponent;
  let fixture: ComponentFixture<TableEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
