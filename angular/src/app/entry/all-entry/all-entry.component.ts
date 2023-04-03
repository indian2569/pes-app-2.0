import { Component, OnInit, OnDestroy } from '@angular/core';
import { EntryDTO } from '../../model/EntryDTO';
import { EntryService } from '../entry.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-all-entry',
  templateUrl: './all-entry.component.html',
  styleUrls: ['./all-entry.component.scss']
})
export class AllEntryComponent implements OnInit, OnDestroy {

  entryData: EntryDTO[] = [];
  onDestroy$ = new Subject();
  
  constructor(private entryService: EntryService) {
   }

  ngOnInit(): void {
    this.entryService.getAllEntrys().pipe(takeUntil(this.onDestroy$))
    .subscribe(entry => this.entryData = entry);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
