import { Component, Inject, Optional, Input, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as _ from "lodash";
import { FormGroup, FormControl } from '@angular/forms';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  local_data: any;
  @Input() action: string;
  @Input() data: any;
  @Input() actionType: number;
  reportForm: FormGroup;
  buttonText: string;
  descriptionText: string;
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dataValue: UsersData) {
    this.local_data = { ...this.dataValue };
    this.action = this.local_data.action;
    this.actionType = this.local_data.actionType;
    this.data = this.fillInputData(this.local_data);

  }

  ngOnInit(): void {
    this.reportForm = this.generateFormGroup(this.actionType);
    this.initButtonText(this.actionType);
    this.initDescriptionText(this.actionType);
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.reportForm.getRawValue()});
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  generateFormGroup(type: number): FormGroup {
    if (!_.isNil(type) && type === 5) {
      return new FormGroup ({
      id: _.isNil(this.data) ?  new FormControl() :  new FormControl(this.data.id),
      name: _.isNil(this.data) ?  new FormControl() :  new FormControl(this.data.name),
      description: _.isNil(this.data) ?  new FormControl() :  new FormControl(this.data.description),
      position: _.isNil(this.data) ?  new FormControl() :  new FormControl(this.data.position)});
    } else {
    return new FormGroup ({
      id: _.isNil(this.data) ?  new FormControl() :  new FormControl(this.data.id),
      name: _.isNil(this.data) ?  new FormControl() :  new FormControl(this.data.name),
      description: _.isNil(this.data) ?  new FormControl() :  new FormControl(this.data.description)});
    }
  }

  fillInputData(userInput): any {
    if (this.actionType === 7) {
      return {
      id: userInput.id,
      name: userInput.client_nick
    };
    } else if (this.actionType === 8) {
      return {
        id: userInput.id,
        name: userInput.place + ' ' + (_.isNil(userInput.program_type) ? '' : userInput.program_type.name) + ' ' + userInput.entry_date_from
      };
    } else if (this.actionType === 5) {
      return {
        id: userInput.id,
        name: userInput.name,
        position: userInput.position,
        description: userInput.description
      };
    } else {
      return {
        id: userInput.id,
        name: userInput.name,
        description: userInput.description
      };
    }
  }

  initButtonText(type: number) {
    const startOfText = this.action === 'Add' ? 'Pridaj' : 'Uprav';
    switch (type) {
    case 1:
      this.buttonText = startOfText + ' inštitúciu';
      break;
    case 2:
      this.buttonText = startOfText + ' kampaň';
      break;
    case 3:
      this.buttonText = startOfText + ' metodu';
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
    default:
      this.buttonText = 'Odoslať';
    }
  }

  initDescriptionText(type: number) {
    const startOfText = this.action === 'Add' ? 'Dialog na pridanie ' : 'Dialog na upravu';
    switch (type) {
        case 1:
      this.descriptionText = startOfText + ' inštitúciu';
      break;
    case 2:
      this.descriptionText = startOfText + ' kampaňe';
      break;
    case 3:
      this.descriptionText = startOfText + ' metody';
      break;
    case 4:
      this.descriptionText = startOfText + ' programu';
      break;
    case 5:
      this.descriptionText = startOfText + ' spolupracovníka';
      break;
    case 6:
      this.descriptionText = startOfText + 'udalosťi';
      break;
    default:
      if (this.action === 'Add') {
        this.descriptionText = 'Pridavaš nový objekt';
      } else if (this.action === 'Update') {
        this.descriptionText = 'Uprpraviť objekt';
      } else if (this.action === 'Delete') {
        this.descriptionText = 'Potvrdenie vymazania';
      }
    }
  }
}
