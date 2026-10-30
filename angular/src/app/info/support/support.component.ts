import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.scss'],
    standalone: false
})
export class SupportComponent {

  constructor(private fb: FormBuilder) { }

  loading = false;

  contactForm = this.fb.group({
    title: ['', Validators.required],
    message: ['', Validators.required]
  });

  submit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;

    const payload = this.contactForm.value;
    console.log(payload);

    // TODO send to backend
    setTimeout(() => this.loading = false, 1500);
  }

}
