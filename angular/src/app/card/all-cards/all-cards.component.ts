import { Component, OnInit } from '@angular/core';
import { CardBasicDTO } from '../../model/CardBasicDTO';
import { CardService } from '../card.service';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit {

  cardData: CardBasicDTO[] = [];

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.getAllCards().subscribe(card => this.cardData = card);
  }

}
