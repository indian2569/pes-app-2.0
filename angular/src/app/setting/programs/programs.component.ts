import { Component } from '@angular/core';

// list, add, edit and delete are handled by the shared <app-table> in the template
@Component({
    selector: 'app-programs',
    templateUrl: './programs.component.html',
    styleUrls: ['./programs.component.scss'],
    standalone: false
})
export class ProgramsComponent {
}
