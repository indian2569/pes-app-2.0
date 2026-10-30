import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingDTO } from '../../model/SettingDTO';

export interface EntityDialogResult {
  event: 'close';
  data: Partial<SettingDTO>;
}

@Component({
    selector: 'app-entity-dialog',
    templateUrl: './entity-dialog.component.html',
    styleUrls: ['./entity-dialog.component.scss'],
    standalone: false
})
export class EntityDialogComponent {

  formGroup: FormGroup<{ name: FormControl<string | null>, description: FormControl<string | null> }>;
  description = 'Test';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EntityDialogComponent, EntityDialogResult>) {
    this.formGroup = this.fb.group({
      name: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
    });
  }

  save() {
    const { name, description } = this.formGroup.getRawValue();
    this.dialogRef.close({event: 'close', data: { name: name ?? '', description: description ?? '' }});
  }

  close() {
    this.dialogRef.close();
  }

}
