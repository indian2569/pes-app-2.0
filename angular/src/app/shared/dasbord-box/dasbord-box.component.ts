import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dasbord-box',
    templateUrl: './dasbord-box.component.html',
    styleUrls: ['./dasbord-box.component.scss'],
    standalone: false
})
export class DasbordBoxComponent {

  @Input()  displayName = '';
  @Input()  displayValue: string | number = '';

}
