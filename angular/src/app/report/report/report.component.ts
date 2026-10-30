import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * TODO: statistics are not implemented yet.
 * The backend has no statistics endpoint; once it exists, add a call to it in a service
 * and display/export the result here. Until then the form is shown but submitting is disabled.
 */
@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    standalone: false
})
export class ReportComponent {

  // TODO: remove once the statistics backend endpoint is implemented
  readonly notImplemented = true;

  statForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.statForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required],
      statType: [null, Validators.required]
    });
  }

  onSubmit() {
    // TODO: send this.statForm.value to the statistics endpoint and show the result
  }

}
