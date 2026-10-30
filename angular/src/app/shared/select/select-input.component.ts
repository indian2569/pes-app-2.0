import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { isNil } from '../utils/is-nil';
import { ChipOption } from '../chips/chips-input.component';
import { CardBasicDTO } from '../../model/CardBasicDTO';
import { SettingDTO } from '../../model/SettingDTO';

/**
 * @title Select with input
 * TODO: component is not declared in any module yet
 */
@Component({
  selector: 'app-select-input',
  templateUrl: 'select-input.component.html',
  styleUrls: ['select-input.component.scss'],
})
export class SelectInputComponent implements OnChanges {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  inputControl = new FormControl('');
  inputValues: ChipOption[] = [];
  selectedValue: ChipOption[] = [];
  inputPlaceholder = 'Pridaj';

  @ViewChild('selectInput') chipsInput?: ElementRef<HTMLInputElement>;
  @Input() title = '';
  @Input() dataSet?: ChipOption[] | null;
  @Input() parentForm?: FormGroup;
  @Input() selectedData?: ChipOption[] | null;
  @Input() type?: number;
  @Input() readonly = false;
  @Input() formName = '';

  // inputs are not set yet in the constructor, so they are read here
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSet']) {
      this.inputValues = isNil(this.dataSet) ? [] : this.dataSet;
    }
    if (changes['selectedData']) {
      this.selectedValue = isNil(this.selectedData) ? [] : [...this.selectedData];
    }
    if (changes['type']) {
      if (this.type === 1) {
          this.inputPlaceholder = 'Pridaj kampaň';
      } else if (this.type === 2) {
          this.inputPlaceholder = 'Pridaj program';
      } else if (this.type === 3) {
          this.inputPlaceholder = 'Pridaj metódu';
      }
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim().toLowerCase();

    // typed text is accepted only when it names an existing option
    const match = this.inputValues.find(option => this.chipDisplayName(option).toLowerCase() === value);
    if (value && match) {
      this.selectedValue.push(match);
    }

    // Clear the input value
    event.chipInput.clear();

    this.inputControl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedValue.push(event.option.value);
    if (this.chipsInput) {
      this.chipsInput.nativeElement.value = '';
    }
    this.inputControl.setValue(null);
  }

  chipDisplayName(chip: ChipOption): string {
     if (this.type === 1 ) {
                return (chip as CardBasicDTO).client_nick ?? '';
        } else {
                return (chip as SettingDTO).name ?? '';
        }
  }
}
