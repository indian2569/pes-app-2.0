import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardBasicDTO } from '../../model/CardBasicDTO';
import { CardService } from '../card.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit, OnDestroy {

  cardData: CardBasicDTO[] = [];
  
  onDestroy$ = new Subject();

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.getAllCards()
    .pipe(takeUntil(this.onDestroy$)).subscribe(card => this.cardData = card);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

}
