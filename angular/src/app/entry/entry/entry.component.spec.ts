import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { testProviders } from '../../../testing/test-providers';
import { EntryModule } from '../entry.module';
import { EntryComponent } from './entry.component';

describe('EntryComponent', () => {
  let component: EntryComponent;
  let fixture: ComponentFixture<EntryComponent>;
  let backend: HttpTestingController;
  let navigate: jasmine.Spy;

  const campaign = { id: '2', name: 'Kampaň', description: '' };
  const program = { id: '2', name: 'Program', description: '' };

  /** Answers the option lists the form loads on start (no entry id, so it opens an empty form). */
  function flushOptionLists(): void {
    for (const req of backend.match(r => r.method === 'GET')) {
      req.flush(req.request.url.includes('/api/card/') ? [{ results: [] }] : []);
    }
  }

  function submitValidForm(): void {
    component.formGroup?.patchValue({ campaign, program_type: program });
    component.onSubmit();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryModule],
      providers: [...testProviders]
    }).compileComponents();

    backend = TestBed.inject(HttpTestingController);
    navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
    fixture = TestBed.createComponent(EntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    flushOptionLists();
  });

  afterEach(() => backend.verify());

  it('opens an empty, editable form for a new entry', () => {
    expect(component.title).toBe('Vytvorenie záznamu');
    expect(component.readonly).toBeFalse();
  });

  it('does not send the form without a campaign and a program', () => {
    component.onSubmit();

    backend.expectNone(r => r.url.endsWith('/api/entry/save'));
    expect(component.formGroup?.controls.campaign.touched).toBeTrue();
  });

  it('locks the form and opens the saved entry after a successful save', () => {
    submitValidForm();
    backend.expectOne(r => r.url.endsWith('/api/entry/save')).flush({ id: 42 });

    expect(component.readonly).toBeTrue();
    expect(component.formGroup?.controls.client.disabled).toBeTrue();
    expect(navigate).toHaveBeenCalledWith(['/entry_line/42']);
  });

  it('keeps the form editable with the user\'s changes when the save fails', () => {
    component.formGroup?.patchValue({ place: 'Skate park' });
    submitValidForm();
    backend.expectOne(r => r.url.endsWith('/api/entry/save')).flush(null, { status: 500, statusText: 'Server Error' });

    expect(component.readonly).toBeFalse();
    expect(component.formGroup?.controls.client.enabled).toBeTrue();
    expect(component.formGroup?.controls.place.value).toBe('Skate park');
  });
});
