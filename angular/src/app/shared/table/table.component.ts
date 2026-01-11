import {Component, ViewChild, Input, OnInit, OnDestroy, AfterViewInit} from '@angular/core';

import { MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

import { SettingService } from '../../setting/setting.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() typeNumber: number;
  @Input() showFilter: boolean = false;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];
  havePosition = false;
  onDestroy$ = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private settingService: SettingService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.setupColumns();
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  // --- Setup dynamic columns
  private setupColumns(): void {
    this.displayedColumns = ['name', 'description'];
    if (this.typeNumber === 5) {
      this.displayedColumns.push('position');
      this.havePosition = true;
    }
    this.displayedColumns.push('action');
  }

  // --- Load data from service
  private loadData(): void {
    const serviceMap: any = {
      1: this.settingService.getAllInstitutions.bind(this.settingService),
      2: this.settingService.getAllCampaigns.bind(this.settingService),
      3: this.settingService.getAllMethods.bind(this.settingService),
      4: this.settingService.getAllPrograms.bind(this.settingService),
      5: this.settingService.getAllCoworkers.bind(this.settingService),
      6: this.settingService.getAllEvents.bind(this.settingService),
    };

    const serviceFn = serviceMap[this.typeNumber];
    if (serviceFn) {
      serviceFn().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataSource.data = res;
      });
    }
  }

  // --- Filter table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // --- Open Dialog for Add / Update / Delete
  openDialog(action: string, obj: any): void {
    obj.action = action;
    obj.actionType = this.typeNumber;

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '720px',
      maxWidth: '95vw',
      data: obj
    });

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      if (!result) return;
      if (result.event === 'Add') this.addRow(result.data);
      else if (result.event === 'Update') this.updateRow(result.data);
      else if (result.event === 'Delete') this.deleteRow(result.data);
    });
  }

  // --- CRUD Operations
  private getServiceMethods(): any {
    const serviceMap: any = {
      1: { save: this.settingService.saveInstitution.bind(this.settingService), delete: this.settingService.deleteInstitution.bind(this.settingService) },
      2: { save: this.settingService.saveCampaign.bind(this.settingService), delete: this.settingService.deleteCampaign.bind(this.settingService) },
      3: { save: this.settingService.saveMethod.bind(this.settingService), delete: this.settingService.deleteMethod.bind(this.settingService) },
      4: { save: this.settingService.saveProgram.bind(this.settingService), delete: this.settingService.deleteProgram.bind(this.settingService) },
      5: { save: this.settingService.saveCoworker.bind(this.settingService), delete: this.settingService.deleteCoworker.bind(this.settingService) },
      6: { save: this.settingService.saveEvent.bind(this.settingService), delete: this.settingService.deleteEvent.bind(this.settingService) },
    };
    return serviceMap[this.typeNumber];
  }

  private addRow(data: any): void {
    const service = this.getServiceMethods();
    service.save(data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataSource.data = [...this.dataSource.data, res];
    });
  }

  private updateRow(data: any): void {
    const service = this.getServiceMethods();
    service.save(data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataSource.data = this.dataSource.data.map(row => row.id === res.id ? res : row);
    });
  }

  private deleteRow(data: any): void {
    const service = this.getServiceMethods();
    service.delete(data.id).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(row => row.id !== data.id);
    });
  }

  // --- Toggle active state
  activateToggle(row: any): void {
    const service = this.getServiceMethods();
    const payload = { ...row, active: !row.active };
    service.save(payload).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataSource.data = this.dataSource.data.map(r => r.id === res.id ? res : r);
    });
  }

}
