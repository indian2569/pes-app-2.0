import { Injectable } from "@angular/core";
import { MAT_NATIVE_DATE_FORMATS, MatDateFormats, NativeDateAdapter } from '@angular/material/core';


@Injectable()
export class CustomDateAdapter extends NativeDateAdapter   {
  override getFirstDayOfWeek(): number {
     return 1;
   }
}

// @ngxmc/datetime-picker uses the Material date adapter, whose default input format has no time part
export const DATE_TIME_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }
  }
};
