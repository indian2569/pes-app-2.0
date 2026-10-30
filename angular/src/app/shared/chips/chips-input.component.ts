import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as _ from 'lodash';

/**
 * @title Chips with input
 */
@Component({
  selector: 'app-chips-input',
  templateUrl: 'chips-input.component.html',
  styleUrls: ['chips-input.component.scss'],
})
export class ChipsInputComponent implements OnChanges {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  inputControl = new FormControl('');
  filteredChips: Observable<string[]>;
  selectedChips: any[] = [];
  allAvaliableChips: any[] = [];
  inputPlaceholder = 'Pridaj';

  @ViewChild('chipsInput') chipsInput: ElementRef<HTMLInputElement>;
  @Input() title: string;
  @Input() dataSet: any[];
  @Input() parentForm: FormGroup;
  @Input() selectedData: any[];
  @Input() type: number;

  // dataSet usually arrives asynchronously, so the suggestion list re-filters when it changes
  private availableChips$ = new BehaviorSubject<any[]>([]);
  // emits whenever selectedChips changes, so already selected options leave (and removed ones return to) the suggestions
  private selectionChanged$ = new BehaviorSubject<void>(undefined);

  constructor() {
    this.filteredChips = combineLatest([
      this.inputControl.valueChanges.pipe(startWith<string | null>(null)),
      this.availableChips$,
      this.selectionChanged$
    ]).pipe(
      map(([fruit]) => (fruit ? this._filter(fruit) : this.allAvaliableChips)
        .filter(chip => !this.isSelected(chip))),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSet']) {
      this.allAvaliableChips = _.isNil(this.dataSet) ? [] : this.dataSet;
      this.availableChips$.next(this.allAvaliableChips);
    }
    if (changes['selectedData']) {
      this.selectedChips = _.isNil(this.selectedData) ? [] : [...this.selectedData];
      this.selectionChanged$.next();
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our selected chip
    if (value && !this.isSelected(value)) {
      this.selectedChips.push(value);
      this.selectionChanged$.next();
    }

    // Clear the input value
    event.chipInput!.clear();

    this.inputControl.setValue(null);
  }

  remove(removedChip: any): void {
    const index = this.selectedChips.indexOf(removedChip);

    if (index >= 0) {
      this.selectedChips.splice(index, 1);
      this.selectionChanged$.next();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.isSelected(event.option.value)) {
      this.selectedChips.push(event.option.value);
      this.selectionChanged$.next();
    }
    this.chipsInput.nativeElement.value = '';
    this.inputControl.setValue(null);
  }

  // compares by id, because chips loaded with an edited entry are different instances than the dataSet options
  private isSelected(chip: any): boolean {
    return this.selectedChips.some(selected =>
      !_.isNil(chip?.id) && !_.isNil(selected?.id) ? selected.id === chip.id : selected === chip);
  }

  private _filter(value: any): string[] {
        let filterObjectValue = '';
        if (this.type === 1 && typeof value !== 'string') {
                filterObjectValue = value.client_nick.toLowerCase();
        } else if (typeof value !== 'string') {
                filterObjectValue = value.name.toLowerCase();
        }
        const filterValue = typeof value === 'string' ? value.toLowerCase() : filterObjectValue.toLowerCase();
        if (_.isNil(this.allAvaliableChips)) {
            return [];
        } else {
            if (this.type === 1) {
                return this.allAvaliableChips.filter(chip => chip.client_nick.toLowerCase().includes(filterValue));
            } else {
                return this.allAvaliableChips.filter(chip => chip.name.toLowerCase().includes(filterValue));
            }
        }
    }

  chipDisplayName(chip: any): String {
     if (this.type === 1 ) {
                return chip.client_nick;
        } else {
                return chip.name;
        }
  }
}
