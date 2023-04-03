import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, ɵɵtrustConstantResourceUrl} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
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
export class ChipsInputComponent {
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

  constructor() {
    this.allAvaliableChips = this.dataSet;
    this.selectedChips = _.isNil(this.selectedData) ? [] : this.selectedData;
    this.filteredChips = this.inputControl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allAvaliableChips)),
    );
    if (this.type === 1) {
        this.inputPlaceholder = 'Pridaj klienta';
    } else if (this.type === 2) {
        this.inputPlaceholder = 'Pridaj spolupracovníka';
    } else if (this.type === 3) {
        this.inputPlaceholder = 'Pridaj metódu';
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.selectedChips.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.inputControl.setValue(null);
  }

  remove(removedChip: string): void {
    const index = this.selectedChips.indexOf(removedChip);

    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedChips.push(event.option.value);
    this.chipsInput.nativeElement.value = '';
    this.inputControl.setValue(null);
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
