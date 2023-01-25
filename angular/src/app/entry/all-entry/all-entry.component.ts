import { Component, OnInit } from '@angular/core';
import { EntryDTO } from '../../model/EntryDTO';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-all-entry',
  templateUrl: './all-entry.component.html',
  styleUrls: ['./all-entry.component.scss']
})
export class AllEntryComponent implements OnInit {

  entryData: EntryDTO[] = [];
  constructor(private entryService: EntryService) {
   }

  ngOnInit(): void {
    this.entryService.getAllEntrys().subscribe(entry => this.entryData = entry);
  }

}
