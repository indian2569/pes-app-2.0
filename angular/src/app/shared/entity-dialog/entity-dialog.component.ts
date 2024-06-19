import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-entity-dialog',
  templateUrl: './entity-dialog.component.html',
  styleUrls: ['./entity-dialog.component.scss']
})
export class EntityDialogComponent implements OnInit {

  formGroup: UntypedFormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: new FormControl(),
      description: new FormControl(),
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
