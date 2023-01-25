import { Component, OnInit } from '@angular/core';
import { CoworkerDTO } from '../../model/CoworkerDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingService } from '../setting.service';
import { EntityDialogComponent } from '../../shared/entity-dialog/entity-dialog.component';

@Component({
  selector: 'app-coworkers',
  templateUrl: './coworkers.component.html',
  styleUrls: ['./coworkers.component.scss']
})
export class CoworkersComponent implements OnInit {

  coworkerData: CoworkerDTO[] = [];

  constructor(private dialog: MatDialog,
              private settingService: SettingService) { }

   ngOnInit(): void {
    this.settingService.getAllCoworkers().subscribe((camp: any) => this.coworkerData = camp);

  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';

    this.dialog.open(EntityDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(EntityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => this.settingService.saveCoworker(data)
    );
  }

}
