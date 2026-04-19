import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, ɵɵtrustConstantResourceUrl} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as _ from 'lodash';

/**
 * @title Select with input
 */
@Component({
  selector: 'app-select-input',
  templateUrl: 'select-input.component.html',
  styleUrls: ['select-input.component.scss'],
})
export class SelectInputComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  inputControl = new FormControl('');
  inputValues:  any[];
  selectedValue: any = {};
  inputPlaceholder = 'Pridaj';

  @ViewChild('selectInput') chipsInput: ElementRef<HTMLInputElement>;
  @Input() title: string;
  @Input() dataSet: any[];
  @Input() parentForm: FormGroup;
  @Input() selectedData: any;
  @Input() type: number;
  @Input() readonly: boolean;
  @Input() formName: string;

  constructor() {
    this.inputValues = this.dataSet;
    this.selectedValue = _.isNil(this.selectedData) ? [] : this.selectedData;
    if (this.type === 1) {
        this.inputPlaceholder = 'Pridaj kampaň';
    } else if (this.type === 2) {
        this.inputPlaceholder = 'Pridaj program';
    } else if (this.type === 3) {
        this.inputPlaceholder = 'Pridaj metódu';
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our selected chip
    if (value) {
      this.selectedValue.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.inputControl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedValue.push(event.option.value);
    this.chipsInput.nativeElement.value = '';
    this.inputControl.setValue(null);
  }

  chipDisplayName(chip: any): String {
     if (this.type === 1 ) {
                return chip.client_nick;
        } else {
                return chip.name;
        }
  }
}
