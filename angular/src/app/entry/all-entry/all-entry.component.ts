import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { EntryPageDTO } from '../../model/EntryPageDTO';
import { PageEvent } from '@angular/material/paginator';
import { EntryFilterParams, EntryService } from '../entry.service';
import { CampaignDTO } from '../../model/CampaignDTO';
import { ProgramDTO } from '../../model/ProgramDTO';
import { LookupService } from '../../shared/lookup/lookup.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FormBuilder } from "@angular/forms";

const DEFAULT_FILTER = {
  place: '',
  timeFrom: null as Date | null,
  timeTo: null as Date | null,
  campaign: '',
  program: '',
  author: '',
  sortBy: 'entryDateFrom',
  sortOrder: 'DESC'
};

@Component({
    selector: 'app-all-entry',
    templateUrl: './all-entry.component.html',
    styleUrls: ['./all-entry.component.scss'],
    standalone: false
})
export class AllEntryComponent implements OnInit, OnDestroy {


  filterForm = this.fb.nonNullable.group({ ...DEFAULT_FILTER });

  campaigns$: Observable<CampaignDTO[]>;
  programs$: Observable<ProgramDTO[]>;

  entryData: EntryPageDTO | null = null;
  pageNumber = 0;
  pageSize = 20;
  // switchMap drops responses of older requests, so a slow request can't overwrite newer results
  private load$ = new Subject<void>();
  onDestroy$ = new Subject();

  constructor(private entryService: EntryService,
              private lookupService: LookupService,
              private fb: FormBuilder,) {
    this.campaigns$ = this.lookupService.getCampaigns();
    this.programs$ = this.lookupService.getPrograms();
   }

  ngOnInit(): void {
    this.load$.pipe(
      switchMap(() => this.entryService.getAllEntrys(this.buildRequest())),
      takeUntil(this.onDestroy$)
    ).subscribe(entries => this.entryData = entries[0]);
    this.load$.next();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  applyFilters(): void {
    this.pageNumber = 0;
    this.load$.next();
  }

  resetFilters(): void {
    this.filterForm.reset({ ...DEFAULT_FILTER });
    this.applyFilters();
  }

  onPageChange(event: PageEvent): void {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.load$.next();
  }

  // maps the form onto the query parameters of GET /api/entry/allEntrys
  private buildRequest(): EntryFilterParams {
    const filters = this.filterForm.getRawValue();
    return {
      page_number: this.pageNumber,
      page_size: this.pageSize,
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
