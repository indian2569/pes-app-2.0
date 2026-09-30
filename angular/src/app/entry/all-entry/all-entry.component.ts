import { Component, OnInit, OnDestroy } from '@angular/core';
import { EntryDTO } from '../../model/EntryDTO';
import { EntryService } from '../entry.service';
import { CampaignDTO } from '../../model/CampaignDTO';
import { CoworkerDTO } from '../../model/CoworkerDTO';
import { ProgramDTO } from '../../model/ProgramDTO';
import { LookupService } from '../../shared/lookup/lookup.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-all-entry',
  templateUrl: './all-entry.component.html',
  styleUrls: ['./all-entry.component.scss']
})
export class AllEntryComponent implements OnInit, OnDestroy {


  filterForm: FormGroup;

  campaigns$: Observable<CampaignDTO[]>;
  programs$: Observable<ProgramDTO[]>;
  coworkers$: Observable<CoworkerDTO[]>;

  entryData: EntryDTO[] = [];
  onDestroy$ = new Subject();

  constructor(private entryService: EntryService,
              private lookupService: LookupService,
              private fb: FormBuilder,) {
    this.filterForm = this.fb.group({
      place: [''],
      timeFrom: [null],
      timeTo: [null],
      campaign: [''],
      program: [''],
      createdBy: [''],
      sortBy: ['time'],
      sortOrder: ['DESC']
    });
   }

  ngOnInit(): void {
    this.campaigns$ = this.lookupService.getCampaigns();
    this.programs$ = this.lookupService.getPrograms();
    this.coworkers$ = this.lookupService.getCoworkers();
    this.entryService.getAllEntrys().pipe(takeUntil(this.onDestroy$))
    .subscribe(entry => this.entryData = entry);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  applyFilters(): void {
    const filters = this.filterForm.value;

    const request = {
      ...filters,
      timeFrom: filters.timeFrom
          ? filters.timeFrom.toISOString()
          : null,
      timeTo: filters.timeTo
          ? filters.timeTo.toISOString()
          : null
    };
/*
    this.entryService.getFilteredData(request).subscribe({
      next: data => this.tableData = data,
      error: err => console.error(err)
    });*/
  }

  resetFilters(): void {
    this.filterForm.reset({
      place: '',
      timeFrom: null,
      timeTo: null,
      campaign: '',
      program: '',
      createdBy: '',
      sortBy: 'time',
      sortOrder: 'DESC'
    });
    this.applyFilters();
  }
}
