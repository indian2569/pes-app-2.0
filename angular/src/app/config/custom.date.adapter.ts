import { NgxMatNativeDateAdapter } from '@angular-material-components/datetime-picker';
import { Injectable } from "@angular/core";
import { NativeDateAdapter } from '@angular/material/core';


@Injectable()
export class CustomDateAdapter extends NgxMatNativeDateAdapter   {
  override getFirstDayOfWeek(): number {
     return 1;
   }
}