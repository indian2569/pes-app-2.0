import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaignDTO } from '../../model/CampaignDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {SettingService} from './../setting.service';
import { throwError, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { EntityDialogComponent } from '../../shared/entity-dialog/entity-dialog.component';

@Component({
  selector: 'app-campaignes',
  templateUrl: './campaignes.component.html',
  styleUrls: ['./campaignes.component.scss']
})
export class CampaignesComponent implements OnInit, OnDestroy {

  campaignesData: CampaignDTO[] = [];
  campaignesSelected: CampaignDTO;
  onDestroy$ = new Subject();

  constructor(private dialog: MatDialog,
              private settingService: SettingService) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';

    this.dialog.open(EntityDialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(EntityDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe((data:any) => this.saveObject(data));
  }

  saveObject(data: any) {
    this.settingService.saveCampaign(data.data).pipe(takeUntil(this.onDestroy$)).subscribe();
    this.refreshTable();
  }

  refreshTable() {
    this.settingService.getAllCampaigns().pipe(takeUntil(this.onDestroy$)).subscribe((camp: any) => {
      this.campaignesData = camp;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
