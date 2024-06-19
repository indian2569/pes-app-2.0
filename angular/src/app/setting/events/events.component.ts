import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventDTO } from '../../model/EventDTO';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EntityDialogComponent } from '../../shared/entity-dialog/entity-dialog.component';
import { SettingService } from '../setting.service';
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {

  eventsData: EventDTO[] = [];
  onDestroy$ = new Subject();

  constructor(private dialog: MatDialog,
              private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getAllEvents().pipe(takeUntil(this.onDestroy$))
    .subscribe((camp: any) => this.eventsData = camp);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';

    this.dialog.open(EntityDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(EntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$))
    .subscribe((data: any) => this.settingService.saveEvent(data));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
