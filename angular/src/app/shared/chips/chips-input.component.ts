import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, forwardRef} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { isNil } from '../utils/is-nil';
import {CardBasicDTO} from '../../model/CardBasicDTO';
import {SettingDTO} from '../../model/SettingDTO';

/** Objects the chips input can select: cards (type 1) or setting items like coworkers and methods (types 2, 3). */
export type ChipOption = CardBasicDTO | SettingDTO;

/**
 * @title Chips with input
 * Form control (use with formControlName / [formControl]) whose value is the array of selected options.
 */
@Component({
    selector: 'app-chips-input',
    templateUrl: 'chips-input.component.html',
    styleUrls: ['chips-input.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ChipsInputComponent), multi: true }
    ],
    standalone: false
})
export class ChipsInputComponent<T extends ChipOption> implements OnChanges, ControlValueAccessor {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // holds the typed text, and briefly the picked option while the autocomplete selects it
  inputControl = new FormControl<string | T | null>('');
  filteredChips: Observable<T[]>;
  selectedChips: T[] = [];
  allAvaliableChips: T[] = [];
  inputPlaceholder = 'Pridaj';
  disabled = false;

  @ViewChild('chipsInput') chipsInput?: ElementRef<HTMLInputElement>;
  @Input() title = '';
  @Input() dataSet?: T[] | null;
  @Input() type?: number;

  // dataSet usually arrives asynchronously, so the suggestion list re-filters when it changes
  private availableChips$ = new BehaviorSubject<T[]>([]);
  // emits whenever selectedChips changes, so already selected options leave (and removed ones return to) the suggestions
  private selectionChanged$ = new BehaviorSubject<void>(undefined);

  private onChange: (value: T[]) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    this.filteredChips = combineLatest([
      this.inputControl.valueChanges.pipe(startWith<string | T | null>(null)),
      this.availableChips$,
      this.selectionChanged$
    ]).pipe(
      map(([fruit]) => (fruit ? this._filter(fruit) : this.allAvaliableChips)
        .filter(chip => !this.isSelected(chip))),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSet']) {
      this.allAvaliableChips = isNil(this.dataSet) ? [] : this.dataSet;
      this.availableChips$.next(this.allAvaliableChips);
    }
    if (changes['type']) {
      if (this.type === 1) {
          this.inputPlaceholder = 'Pridaj klienta';
      } else if (this.type === 2) {
          this.inputPlaceholder = 'Pridaj spolupracovníka';
      } else if (this.type === 3) {
          this.inputPlaceholder = 'Pridaj metódu';
      }
    }
  }

  // ===== ControlValueAccessor =====

  writeValue(value: T[] | null): void {
    this.selectedChips = isNil(value) ? [] : [...value];
    this.selectionChanged$.next();
  }

  registerOnChange(fn: (value: T[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.inputControl.disable({ emitEvent: false });
    } else {
      this.inputControl.enable({ emitEvent: false });
    }
  }

  // ===== chip handling =====

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim().toLowerCase();

    // typed text is accepted only when it names an existing option, the backend expects objects not free text
    const match = this.allAvaliableChips.find(chip => this.chipDisplayName(chip).toLowerCase() === value);
    if (value && match && !this.isSelected(match)) {
      this.updateSelection([...this.selectedChips, match]);
    }

    // Clear the input value
    event.chipInput.clear();

    this.inputControl.setValue(null);
  }

  remove(removedChip: T): void {
    if (this.selectedChips.includes(removedChip)) {
      this.updateSelection(this.selectedChips.filter(chip => chip !== removedChip));
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const chip: T = event.option.value;
    if (!this.isSelected(chip)) {
      this.updateSelection([...this.selectedChips, chip]);
    }
    if (this.chipsInput) {
      this.chipsInput.nativeElement.value = '';
    }
    this.inputControl.setValue(null);
  }

  private updateSelection(chips: T[]): void {
    this.selectedChips = chips;
    this.selectionChanged$.next();
    this.onChange([...chips]);
    this.onTouched();
  }

  // compares by id, because chips loaded with an edited entry are different instances than the dataSet options
  private isSelected(chip: T): boolean {
    return this.selectedChips.some(selected =>
      !isNil(chip.id) && !isNil(selected.id) ? selected.id === chip.id : selected === chip);
  }

  private _filter(value: string | T): T[] {
    const filterValue = (typeof value === 'string' ? value : this.chipDisplayName(value)).toLowerCase();
    return this.allAvaliableChips.filter(chip => this.chipDisplayName(chip).toLowerCase().includes(filterValue));
  }

  chipDisplayName(chip: T): string {
    if (this.isCard(chip)) {
      return chip.client_nick ?? '';
    }
    return (chip as SettingDTO).name ?? '';
  }

  private isCard(chip: ChipOption): chip is CardBasicDTO {
    return this.type === 1;
  }
}
