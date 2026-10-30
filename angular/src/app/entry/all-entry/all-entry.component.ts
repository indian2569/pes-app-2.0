import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { EntryDTO } from '../../model/EntryDTO';
import { EntryFilterParams, EntryService } from '../entry.service';
import { CampaignDTO } from '../../model/CampaignDTO';
import { ProgramDTO } from '../../model/ProgramDTO';
import { LookupService } from '../../shared/lookup/lookup.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from "@angular/forms";

const DEFAULT_FILTER = {
  place: '',
  timeFrom: null,
  timeTo: null,
  campaign: '',
  program: '',
  author: '',
  sortBy: 'entryDateFrom',
  sortOrder: 'DESC'
};

@Component({
  selector: 'app-all-entry',
  templateUrl: './all-entry.component.html',
  styleUrls: ['./all-entry.component.scss']
})
export class AllEntryComponent implements OnInit, OnDestroy {


  filterForm: FormGroup;

  campaigns$: Observable<CampaignDTO[]>;
  programs$: Observable<ProgramDTO[]>;

  entryData: EntryDTO[] = [];
  // switchMap drops responses of older requests, so a slow request can't overwrite newer results
  private load$ = new Subject<void>();
  onDestroy$ = new Subject();

  constructor(private entryService: EntryService,
              private lookupService: LookupService,
              private fb: FormBuilder,) {
    this.filterForm = this.fb.group({ ...DEFAULT_FILTER });
   }

  ngOnInit(): void {
    this.campaigns$ = this.lookupService.getCampaigns();
    this.programs$ = this.lookupService.getPrograms();
    this.load$.pipe(
      switchMap(() => this.entryService.getAllEntrys(this.buildRequest())),
      takeUntil(this.onDestroy$)
    ).subscribe(entry => this.entryData = entry);
    this.load$.next();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  applyFilters(): void {
    this.load$.next();
  }

  resetFilters(): void {
    this.filterForm.reset({ ...DEFAULT_FILTER });
    this.applyFilters();
  }

  // maps the form onto the query parameters of GET /api/entry/allEntrys
  private buildRequest(): EntryFilterParams {
    const filters = this.filterForm.value;
    return {
      place: filters.place,
      campaign: filters.campaign,
      program: filters.program,
      yearfrom: filters.timeFrom ? formatDate(filters.timeFrom, 'yyyy-MM-dd', 'en-US') : null,
      yearto: filters.timeTo ? formatDate(filters.timeTo, 'yyyy-MM-dd', 'en-US') : null,
      author: filters.author,
      sort: filters.sortOrder === 'DESC' ? `${filters.sortBy}(desc)` : filters.sortBy
    };
  }
}
