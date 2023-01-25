import { Component, OnInit } from '@angular/core';
import { MethodsDTO } from '../../model/MethodsDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingService } from '../setting.service';
import { EntityDialogComponent } from '../../shared/entity-dialog/entity-dialog.component';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss']
})
export class MethodsComponent implements OnInit {

  methodsData: MethodsDTO[] = [];

  constructor(private dialog: MatDialog,
              private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getAllMethods().subscribe((camp: any) => this.methodsData = camp);

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
      (data: any) => this.settingService.saveMethod(data)
    );
  }
}
