import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dasbord-box',
  templateUrl: './dasbord-box.component.html',
  styleUrls: ['./dasbord-box.component.scss']
})
export class DasbordBoxComponent implements OnInit {

  @Input()  displayName: String;
  @Input()  displayValue: String;

  constructor() { }

  ngOnInit(): void {
  }

}
