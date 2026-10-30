import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardPageDTO } from '../../model/CardPageDTO';
import { CardService } from '../card.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import {FormBuilder, FormGroup} from "@angular/forms";
import { PageEvent } from '@angular/material/paginator';

const DEFAULT_FILTER = {
  name: '',
  gender: '',
  yearFrom: null,
  yearTo: null,
  author: '',
  sortBy: 'clientNick',
  sortOrder: 'ASC'
};

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit, OnDestroy {

  cardData: CardPageDTO;
  filterForm: FormGroup;
  pageNumber = 0;
  pageSize = 20;

  // switchMap drops responses of older requests, so a slow request can't overwrite newer results
  private load$ = new Subject<void>();
  onDestroy$ = new Subject();

  constructor(private fb: FormBuilder, private cardService: CardService) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({ ...DEFAULT_FILTER });
    this.load$.pipe(
      switchMap(() => this.cardService.getAllCards(this.buildRequest())),
      takeUntil(this.onDestroy$)
    ).subscribe(cards => this.cardData = cards[0]);
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

  // maps the form onto the query parameters of GET /api/card/allCards
  private buildRequest(): any {
    const filters = this.filterForm.value;
    return {
      page_number: this.pageNumber,
      page_size: this.pageSize,
      name: filters.name,
      gender: filters.gender,
      yearfrom: filters.yearFrom,
      yearto: filters.yearTo,
      author: filters.author,
      sort: filters.sortOrder === 'DESC' ? `${filters.sortBy}(desc)` : filters.sortBy
    };
  }
}
