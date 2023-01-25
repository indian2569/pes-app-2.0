import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { RouterModule, Routes } from '@angular/router';
import { AllCardsComponent } from './all-cards/all-cards.component';

const cardRoutes: Routes = [
  { path: 'all_cards', component: AllCardsComponent, },
  { path: 'add_cards', component: CardComponent, },
  { path: ':id', component: CardComponent, }
];


@NgModule({
  imports: [
    RouterModule.forChild(
      cardRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class CarRoutingModule { }
