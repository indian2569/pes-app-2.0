import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dashboard-box',
    templateUrl: './dashboard-box.component.html',
    styleUrls: ['./dashboard-box.component.scss'],
    standalone: false
})
export class DashboardBoxComponent {

  @Input()  displayName = '';
  @Input()  displayValue: string | number = '';

}
