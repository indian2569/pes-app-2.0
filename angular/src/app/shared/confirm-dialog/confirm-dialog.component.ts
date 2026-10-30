import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    standalone: false
})
export class ConfirmDialogComponent {

  @Input() title = '';
  @Input() message = '';
  @Input() btnOkText = '';
  @Input() btnCancelText = '';

  constructor(private activeModal: MatDialogRef<ConfirmDialogComponent>) { }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

}

