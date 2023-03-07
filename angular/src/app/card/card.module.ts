import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { AllCardsComponent } from './all-cards/all-cards.component';
import { CarRoutingModule } from './car-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CardComponent,
    AllCardsComponent,
  ],
  imports: [
    CommonModule,
    CarRoutingModule,

    SharedModule
  ]
})
export class CardModule { }
