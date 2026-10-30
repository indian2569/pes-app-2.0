import { Component, Inject, Optional, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNil } from '../utils/is-nil';
import {  FormGroup, FormControl } from '@angular/forms';
import { CardBasicDTO } from '../../model/CardBasicDTO';
import { CoworkerDTO } from '../../model/CoworkerDTO';
import { EntryDTO } from '../../model/EntryDTO';
import { SettingDTO } from '../../model/SettingDTO';

export type DialogAction = 'Add' | 'Update' | 'Delete';

/**
 * Data passed to the dialog.
 * actionType: 1 institution, 2 campaign, 3 method, 4 program, 5 coworker, 6 event, 7 card, 8 entry.
 */
export interface DialogBoxData {
  action: DialogAction;
  actionType: number;
  row: Partial<SettingDTO> | CoworkerDTO | CardBasicDTO | EntryDTO;
}

/** Values of the dialog form, the shape of a setting item. */
export interface DialogBoxValue {
  id?: string;
  name: string;
  description: string;
  position?: string;
}

export type DialogBoxResult = { event: DialogAction, data: DialogBoxValue } | { event: 'Cancel' };

@Component({
    selector: 'app-dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog-box.component.scss'],
    standalone: false
})
export class DialogBoxComponent implements OnInit {

  @Input() action: DialogAction = 'Add';
  @Input() data: DialogBoxValue;
  @Input() actionType = 0;
  reportForm = new FormGroup({
    id: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    position: new FormControl('', { nonNullable: true })
  });
  buttonText = '';
  descriptionText = '';
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent, DialogBoxResult>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dataValue: DialogBoxData | null) {
    if (!isNil(this.dataValue)) {
      this.action = this.dataValue.action;
      this.actionType = this.dataValue.actionType;
    }
    this.data = this.fillInputData(this.dataValue?.row);

  }

  ngOnInit(): void {
    this.reportForm.reset({ position: '', ...this.data });
    this.initButtonText(this.actionType);
    this.initDescriptionText(this.actionType);
  }

  doAction() {
    const { position, ...value } = this.reportForm.getRawValue();
    // only coworkers have a position
    const data: DialogBoxValue = this.actionType === 5 ? { ...value, position } : value;
    this.dialogRef.close({event: this.action, data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  fillInputData(userInput: DialogBoxData['row'] | undefined): DialogBoxValue {
    if (isNil(userInput)) {
      return { name: '', description: '' };
    }
    if (this.actionType === 7) {
      const card = userInput as CardBasicDTO;
      return {
      id: card.id?.toString(),
      name: card.client_nick ?? '',
      description: ''
    };
    } else if (this.actionType === 8) {
      const entry = userInput as EntryDTO;
      return {
        id: entry.id?.toString(),
        name: entry.place + ' ' + (isNil(entry.program_type) ? '' : entry.program_type.name) + ' ' + entry.entry_date_from,
        description: ''
      };
    } else if (this.actionType === 5) {
      const coworker = userInput as Partial<CoworkerDTO>;
      return {
        id: coworker.id,
        name: coworker.name ?? '',
        position: coworker.position,
        description: coworker.description ?? ''
      };
    } else {
      const setting = userInput as Partial<SettingDTO>;
      return {
        id: setting.id,
        name: setting.name ?? '',
        description: setting.description ?? ''
      };
    }
  }

  initButtonText(type: number) {
    let startOfText = this.action === 'Add' ? 'Pridaj' : 'Uprav';
    if (this.action === 'Delete') {
      startOfText = 'Vymaž';
    }
    switch (type) {
    case 1:
      this.buttonText = startOfText + ' inštitúciu';
      break;
    case 2:
      this.buttonText = startOfText + ' kampaň';
      break;
    case 3:
      this.buttonText = startOfText + ' metódu';
      break;
    case 4:
      this.buttonText = startOfText + ' program';
      break;
    case 5:
      this.buttonText = startOfText + ' spolupracovníka';
      break;
    case 6:
      this.buttonText = startOfText + ' udalosť';
      break;
    case 7:
        this.buttonText = startOfText + ' kartu';
        break;
    case 8:
      this.buttonText = startOfText + ' záznam';
      break;
    default:
      this.buttonText = 'Odoslať';
    }
  }

  initDescriptionText(type: number) {
    const startOfText = this.action === 'Add' ? 'Pridanie' : 'Úprava';
    switch (type) {
        case 1:
      this.descriptionText = startOfText + ' inštitúcie';
      break;
    case 2:
      this.descriptionText = startOfText + ' kampane';
      break;
    case 3:
      this.descriptionText = startOfText + ' metódy';
      break;
    case 4:
      this.descriptionText = startOfText + ' programu';
      break;
    case 5:
      this.descriptionText = startOfText + ' spolupracovníka';
      break;
    case 6:
      this.descriptionText = startOfText + ' udalosti';
      break;
    case 7:
        this.descriptionText = startOfText + ' karty';
        break;
    case 8:
      this.descriptionText = startOfText + ' záznamu';
      break;
    default:
      if (this.action === 'Add') {
        this.descriptionText = 'Pridanie nového objektu';
      } else if (this.action === 'Update') {
        this.descriptionText = 'Úprava objektu';
      } else if (this.action === 'Delete') {
        this.descriptionText = 'Potvrdenie vymazania';
      }
    }
  }
}
