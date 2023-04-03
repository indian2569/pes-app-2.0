import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstitutionDTO } from '../../model/InstitutionDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingService } from '../setting.service';
import { EntityDialogComponent } from '../../shared/entity-dialog/entity-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit, OnDestroy {

  instituteData: InstitutionDTO[] = [];
  onDestroy$ = new Subject();


  constructor(private dialog: MatDialog,
              private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getAllInstitutions().pipe(takeUntil(this.onDestroy$))
    .subscribe((camp: any) => this.instituteData = camp);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';

    this.dialog.open(EntityDialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(EntityDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(
      (data: any) => this.settingService.saveInstitution(data)
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
