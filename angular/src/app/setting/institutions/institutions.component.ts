import { Component, OnInit } from '@angular/core';
import { InstitutionDTO } from '../../model/InstitutionDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingService } from '../setting.service';
import { EntityDialogComponent } from '../../shared/entity-dialog/entity-dialog.component';
import { identity } from 'rxjs';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit {

  instituteData: InstitutionDTO[] = [];

  constructor(private dialog: MatDialog,
              private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getAllInstitutions().subscribe((camp: any) => this.instituteData = camp);
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
      (data: any) => this.settingService.saveInstitution(data)
    );
  }
}
