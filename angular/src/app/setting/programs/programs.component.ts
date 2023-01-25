import { Component, OnInit } from '@angular/core';
import { ProgramDTO } from '../../model/ProgramDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingService } from '../setting.service';
import { EntityDialogComponent } from '../../shared/entity-dialog/entity-dialog.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  programData: ProgramDTO[] = [];

  constructor(private dialog: MatDialog,
              private settingService: SettingService) { }

   ngOnInit(): void {
    this.settingService.getAllPrograms().subscribe((camp: any) => this.programData = camp);
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
      (data: any) => this.settingService.saveProgram(data)
    );
  }
}
