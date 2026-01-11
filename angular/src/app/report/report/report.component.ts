import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  statForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.statForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required],
      statType: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.statForm.valid) {
      this.loading = true;

      const filterData = this.statForm.value;
      console.log(filterData);

      // TODO: send to backend
      setTimeout(() => this.loading = false, 1500);
    }
  }

}
