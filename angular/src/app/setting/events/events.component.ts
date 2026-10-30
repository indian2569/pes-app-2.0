import { Component } from '@angular/core';

// list, add, edit and delete are handled by the shared <app-table> in the template
@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    standalone: false
})
export class EventsComponent {
}
