import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

import { testProviders } from '../../../testing/test-providers';
import { SettingDTO } from '../../model/SettingDTO';
import { FormControlsModule } from '../form-controls.module';
import { ChipsInputComponent } from './chips-input.component';

const method = (id: string, name: string): SettingDTO => ({ id, name, description: '' });

@Component({
  template: `<app-chips-input title="Metódy" [type]="3" [dataSet]="options" [formControl]="control"></app-chips-input>`,
  standalone: false
})
class HostComponent {
  options = [method('1', 'Rozhovor'), method('2', 'Pozorovanie'), method('3', 'Prevencia')];
  control = new FormControl<SettingDTO[]>([], { nonNullable: true });
}

describe('ChipsInputComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let chips: ChipsInputComponent<SettingDTO>;

  const chipNames = () => fixture.debugElement.queryAll(By.css('mat-chip-row'))
    .map(row => (row.nativeElement as HTMLElement).textContent?.replace('cancel', '').trim());
  const suggestions = () => {
    let names: string[] = [];
    chips.filteredChips.pipe(take(1)).subscribe(list => names = list.map(chip => chip.name));
    return names;
  };
  const pick = (chip: SettingDTO) => chips.selected({ option: { value: chip } } as MatAutocompleteSelectedEvent);
  const type = (text: string) => chips.add({ value: text, chipInput: { clear: () => undefined } } as MatChipInputEvent);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [FormControlsModule],
      providers: testProviders
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    chips = fixture.debugElement.query(By.directive(ChipsInputComponent)).componentInstance;
  });

  it('shows the chips of the form value', () => {
    host.control.setValue([method('2', 'Pozorovanie')]);
    fixture.detectChanges();

    expect(chipNames()).toEqual(['Pozorovanie']);
  });

  it('writes a picked option into the form control', () => {
    pick(host.options[0]);

    expect(host.control.value.map(m => m.id)).toEqual(['1']);
    expect(host.control.touched).toBeTrue();
  });

  it('does not offer options that are already selected', () => {
    pick(host.options[0]);

    expect(suggestions()).toEqual(['Pozorovanie', 'Prevencia']);
  });

  it('matches selected options by id, also for copies loaded with an edited entry', () => {
    host.control.setValue([method('3', 'Prevencia')]);

    expect(suggestions()).toEqual(['Rozhovor', 'Pozorovanie']);
  });

  it('cannot select the same option twice', () => {
    pick(host.options[0]);
    pick(method('1', 'Rozhovor'));

    expect(host.control.value.length).toBe(1);
  });

  it('accepts typed text only when it names an existing option', () => {
    type('neexistuje');
    type('pozorovanie');

    expect(host.control.value.map(m => m.name)).toEqual(['Pozorovanie']);
  });

  it('gives an option back to the suggestions after it is removed', () => {
    pick(host.options[0]);
    chips.remove(chips.selectedChips[0]);

    expect(host.control.value).toEqual([]);
    expect(suggestions()).toEqual(['Rozhovor', 'Pozorovanie', 'Prevencia']);
  });

  it('locks the input and hides remove buttons when the control is disabled', () => {
    host.control.setValue([method('1', 'Rozhovor')]);
    host.control.disable();
    fixture.detectChanges();

    expect(chips.inputControl.disabled).toBeTrue();
    expect(fixture.debugElement.queryAll(By.css('button[matChipRemove]')).length).toBe(0);
  });
});
