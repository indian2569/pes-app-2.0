import { ComponentFixture, TestBed } from '@angular/core/testing';

import { dialogProviders, testProviders } from '../../../testing/test-providers';
import { SharedModule } from '../shared.module';
import { EntityDialogComponent } from './entity-dialog.component';

describe('EntityDialogComponent', () => {
  let component: EntityDialogComponent;
  let fixture: ComponentFixture<EntityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [...testProviders, ...dialogProviders()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
