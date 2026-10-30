import { Component } from '@angular/core';

// list, add, edit and delete are handled by the shared <app-table> in the template
@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    standalone: false
})
export class EventsComponent {
}
