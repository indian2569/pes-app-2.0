import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-entity-dialog',
  templateUrl: './entity-dialog.component.html',
  styleUrls: ['./entity-dialog.component.scss']
})
export class EntityDialogComponent implements OnInit {

  formGroup: UntypedFormGroup;
  description: string;

  constructor(
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<EntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: new UntypedFormControl(),
      description: new UntypedFormControl(),
    });
    this.description = 'Test';
  }

  save() {
    this.dialogRef.close({event: 'close', data: this.formGroup.value});
  }

  close() {
    this.dialogRef.close();
  }

}
