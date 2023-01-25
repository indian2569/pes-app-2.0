import { Component, ViewChild, Input, OnInit } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

import * as _ from "lodash";
import { InstitutionDTO } from '../../model/InstitutionDTO';
import { SettingService } from '../../setting/setting.service';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  dataSource: any[];
  havePosition = false;

  @ViewChild(MatTable, {static: true} ) table: MatTable<any>;
  @Input() tableData: InstitutionDTO[];
  @Input() typeNumber: number;

  displayedColumns!: string[];
  constructor(public dialog: MatDialog,
              private settingService: SettingService) {}

  ngOnInit(): void {
    this.displayedColumns = this.typeNumber === 5 ? ['name', 'description', 'position' , 'action'] : ['name', 'description', 'action'];
    switch (this.typeNumber) {
    case 1:
      this.settingService.getAllInstitutions().subscribe((camp: any) => {
        this.dataSource = camp;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    case 2:
      this.settingService.getAllCampaigns().subscribe((camp: any) => {
        this.dataSource = camp;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    case 3:
      this.settingService.getAllMethods().subscribe((camp: any) => {
        this.dataSource = camp;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    case 4:
      this.settingService.getAllPrograms().subscribe((camp: any) => {
        this.dataSource = camp;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    case 5:
      this.settingService.getAllCoworkers().subscribe((camp: any) => {
        this.dataSource = camp;
        this.havePosition = true;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    case 6:
      this.settingService.getAllEvents().subscribe((camp: any) => {
        this.dataSource = camp;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    }
  }

  openDialog (action: any, obj: any) {
    obj.action = action;
    obj.actionType = this.typeNumber;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '720px',
      height : 'auto',
      data: obj
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }


  addRowData(row_obj: any) {
    console.log(row_obj);
    var d = new Date();
    this.dataSource.push({
      name: row_obj.name,
      description: row_obj.description
    });
    switch (this.typeNumber) {
    case 1:
      this.settingService.saveInstitution({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 2:
      this.settingService.saveCampaign({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 3:
      this.settingService.saveMethod({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 4:
      this.settingService.saveProgram({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 5:
      this.settingService.saveCoworker({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          position: row_obj.position
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 6:
      this.settingService.saveEvent({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    }
  }

  updateRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === row_obj.id) {
        value.name = row_obj.name;
        value.description = row_obj.description;
      }
      return true;
    });
    switch (this.typeNumber) {
    case 1:
      this.settingService.saveInstitution({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 2:
      this.settingService.saveCampaign({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 3:
      this.settingService.saveMethod({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 4:
      this.settingService.saveProgram({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 5:
      this.settingService.saveCoworker({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          position: row_obj.havePosition
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 6:
      this.settingService.saveEvent({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    }
  }

  deleteRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== row_obj.id;
    });
    this.settingService.deleteCampaign(row_obj.id).subscribe((sub: any) => this.table.renderRows());
  }

  activateTogle(row_obj: any) {
     this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === row_obj.id) {
        value.name = row_obj.name;
        value.description = row_obj.description;
      }
      return true;
    });
    switch (this.typeNumber) {
    case 1:
      this.settingService.saveInstitution({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          active: !row_obj.active
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 2:
      this.settingService.saveCampaign({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          active: !row_obj.active
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 3:
      this.settingService.saveMethod({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          active: !row_obj.active
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 4:
      this.settingService.saveProgram({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          active: !row_obj.active
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 5:
      this.settingService.saveCoworker({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          position: row_obj.havePosition,
          active: !row_obj.active
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    case 6:
      this.settingService.saveEvent({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          active: !row_obj.active
        }).subscribe((sub: any) => this.table.renderRows());
      break;
    }
  }
}
