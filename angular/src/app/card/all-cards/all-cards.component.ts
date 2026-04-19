import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardBasicDTO } from '../../model/CardBasicDTO';
import { CardPageDTO } from '../../model/CardPageDTO';
import { CardService } from '../card.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit, OnDestroy {

  cardData: CardPageDTO;
  filterForm: FormGroup;

  onDestroy$ = new Subject();

  constructor(private fb: FormBuilder,private cardService: CardService) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: [''],
      sex: [''],
      timeFrom: [null],
      timeTo: [null],
      active: [''],
      createdBy: [''],
      sortBy: ['name'],
      sortOrder: ['ASC']
    });
    this.cardService.getAllCards()
    .pipe(takeUntil(this.onDestroy$)).subscribe(card => this.cardData = card);
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
