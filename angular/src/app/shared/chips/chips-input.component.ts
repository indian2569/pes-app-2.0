import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, ɵɵtrustConstantResourceUrl} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as _ from 'lodash';

export interface Fruit {
  name: string;
}

/**
 * @title Chips with input
 */
@Component({
  selector: 'chips-input',
  templateUrl: 'chips-input.component.html',
  styleUrls: ['chips-input.component.scss'],
})
export class ChipsInputComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  inputControl = new FormControl('');
  filteredChips: Observable<string[]>;
  selectedChips: any[] = [];
  allAvaliableChips: any[] = [];

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
    const filterValue = typeof value  === 'string' ? value.toLowerCase() : value.client_nick.toLowerCase();
    if (_.isNil(this.allAvaliableChips)) {
          return [];
    } else {
          console.log(value, this.allAvaliableChips.filter(fruit => fruit.client_nick.toLowerCase().includes(filterValue)));
          return this.allAvaliableChips.filter(fruit => fruit.client_nick.toLowerCase().includes(filterValue));
          }
  }
}
