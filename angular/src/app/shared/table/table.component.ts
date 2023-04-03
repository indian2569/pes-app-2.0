import { Component, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

import * as _ from "lodash";
import { InstitutionDTO } from '../../model/InstitutionDTO';
import { SettingService } from '../../setting/setting.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  dataSource: any[];
  havePosition = false;
  onDestroy$ = new Subject();

  @ViewChild(MatTable, {static: true} ) table: MatTable<any>;
  @Input() tableData: InstitutionDTO[];
  @Input() typeNumber: number;

  displayedColumns!: string[];
  constructor(public dialog: MatDialog,
              private settingService: SettingService) {}

  ngOnInit(): void {
    switch (this.typeNumber) {
    case 1:
      this.settingService.getAllInstitutions().pipe(takeUntil(this.onDestroy$))
      .subscribe((camp: any) => {
        this.dataSource = camp;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    case 2:
      this.settingService.getAllCampaigns().pipe(takeUntil(this.onDestroy$))
      .subscribe((camp: any) => {
        this.dataSource = camp;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    case 3:
      this.settingService.getAllMethods().pipe(takeUntil(this.onDestroy$))
      .subscribe((camp: any) => {
        this.dataSource = camp;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    case 4:
      this.settingService.getAllPrograms().pipe(takeUntil(this.onDestroy$))
      .subscribe((camp: any) => {
        this.dataSource = camp;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    case 5:
      this.settingService.getAllCoworkers().pipe(takeUntil(this.onDestroy$))
      .subscribe((camp: any) => {
        this.dataSource = camp;
        this.havePosition = true;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    case 6:
      this.settingService.getAllEvents().pipe(takeUntil(this.onDestroy$))
      .subscribe((camp: any) => {
        this.dataSource = camp;
        if (this.dataSource.length > 0) {
          this.table.renderRows();
        }
      });
      break;
    }
    this.displayedColumns = this.typeNumber === 5 ? ['name', 'description', 'position' , 'action'] : ['name', 'description', 'action'];
  }

  openDialog (action: any, obj: any) {
    obj.action = action;
    obj.actionType = this.typeNumber;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '720px',
      height : 'auto',
      data: obj
    });

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe((result: any) => {
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

    switch (this.typeNumber) {
    case 1:
        this.settingService.saveInstitution({
                id: row_obj.id,
                name: row_obj.name,
                description: row_obj.description
            }).pipe(takeUntil(this.onDestroy$))
              .subscribe((sub: any) => {
                    this.addToDataSource(sub);
                    this.table.renderRows()
              });
      break;
    case 2:
      this.settingService.saveCampaign({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).pipe(takeUntil(this.onDestroy$))
          .subscribe((sub: any) => {
              this.addToDataSource(sub);
              this.table.renderRows()
          });
      break;
    case 3:
      this.settingService.saveMethod({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).pipe(takeUntil(this.onDestroy$))
          .subscribe((sub: any) => {
              this.addToDataSource(sub);
              this.table.renderRows()
          });
      break;
    case 4:
      this.settingService.saveProgram({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).pipe(takeUntil(this.onDestroy$))
          .subscribe((sub: any) => {
              this.addToDataSource(sub);
              this.table.renderRows()
          });
      break;
    case 5:
      this.settingService.saveCoworker({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          position: row_obj.position
        }).pipe(takeUntil(this.onDestroy$))
          .subscribe((sub: any) => {
              this.addToDataSource(sub);
              this.table.renderRows()
          });
      break;
    case 6:
      this.settingService.saveEvent({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).pipe(takeUntil(this.onDestroy$))
          .subscribe((sub: any) => {
              this.addToDataSource(sub);
              this.table.renderRows()
          });
      break;
    }
  }

  addToDataSource(row_obj: any) {
    this.dataSource.push({
      id: row_obj.id,
      name: row_obj.name,
      description: row_obj.description
    });
  }

  updateDataSource(row_obj: any) {
        this.dataSource = this.dataSource.filter((value, key) => {
            if (value.id === row_obj.id) {
                value.name = row_obj.name;
                value.description = row_obj.description;
                value.active = row_obj.active;
                if (this.typeNumber === 5) {
                    value.position = row_obj.position;
                }
            }
            return true;
        });
    }

  removeDataFromDataSource(row_obj: any) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== row_obj.id;
    });
  }

  updateRowData(row_obj: any) {
    switch (this.typeNumber) {
    case 1:
      this.settingService.saveInstitution({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    case 2:
      this.settingService.saveCampaign({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    case 3:
      this.settingService.saveMethod({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    case 4:
      this.settingService.saveProgram({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    case 5:
      this.settingService.saveCoworker({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          position: row_obj.position
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    case 6:
      this.settingService.saveEvent({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    }
  }

  deleteRowData(row_obj: any) {
    switch (this.typeNumber) {
        case 1:
        this.settingService.deleteInstitution(row_obj.id).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) => {
            this.removeDataFromDataSource(row_obj);
            this.table.renderRows();
        });
        break;
        case 2:
        this.settingService.deleteCampaign(row_obj.id).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) => {
            this.removeDataFromDataSource(row_obj);
            this.table.renderRows();
        });
        break;
        case 3:
        this.settingService.deleteMethod(row_obj.id).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) => {
            this.removeDataFromDataSource(row_obj);
            this.table.renderRows();
        });
        break;
        case 4:
        this.settingService.deleteProgram(row_obj.id).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) => {
            this.removeDataFromDataSource(row_obj);
            this.table.renderRows();
        });
        break;
        case 5:
        this.settingService.deleteCoworker(row_obj.id).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) => {
            this.removeDataFromDataSource(row_obj);
            this.table.renderRows();
        });
        break;
        case 6:
        this.settingService.deleteEvent(row_obj.id).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) => {
            this.removeDataFromDataSource(row_obj);
            this.table.renderRows();
        });
        break;
    }
  }

  activateTogle(row_obj: any) {
    switch (this.typeNumber) {
    case 1:
      this.settingService.saveInstitution({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          active: !row_obj.active
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    case 2:
      this.settingService.saveCampaign({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          active: !row_obj.active
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    case 3:
      this.settingService.saveMethod({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          active: !row_obj.active
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    case 4:
      this.settingService.saveProgram({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          active: !row_obj.active
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    case 5:
      this.settingService.saveCoworker({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          position: row_obj.position,
          active: !row_obj.active
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    case 6:
      this.settingService.saveEvent({
          id: row_obj.id,
          name: row_obj.name,
          description: row_obj.description,
          active: !row_obj.active
        }).pipe(takeUntil(this.onDestroy$))
        .subscribe((sub: any) =>  {
            this.updateDataSource(sub);
            this.table.renderRows();
        });
      break;
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
