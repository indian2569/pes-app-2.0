import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgramDTO } from '../../model/ProgramDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingService } from '../setting.service';
import { EntityDialogComponent } from '../../shared/entity-dialog/entity-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit, OnDestroy {

  programData: ProgramDTO[] = [];
  onDestroy$ = new Subject();

  constructor(private dialog: MatDialog,
              private settingService: SettingService) { }

   ngOnInit(): void {
    this.settingService.getAllPrograms().pipe(takeUntil(this.onDestroy$))
    .subscribe((camp: any) => this.programData = camp);
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
      (data: any) => this.settingService.saveProgram(data)
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
