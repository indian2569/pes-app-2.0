import {Component, ViewChild, Input, OnInit, OnDestroy, AfterViewInit} from '@angular/core';

import { MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogAction, DialogBoxComponent, DialogBoxData, DialogBoxResult } from '../dialog-box/dialog-box.component';

import { SettingService } from '../../setting/setting.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import { CoworkerDTO } from '../../model/CoworkerDTO';
import { isNil } from '../utils/is-nil';

/** Rows of the setting tables; only coworkers (type 5) have a position. */
type SettingRow = CoworkerDTO;

interface SettingApi {
  getAll(): Observable<SettingRow[]>;
  save(item: SettingRow): Observable<SettingRow>;
  delete(id: string): Observable<SettingRow>;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() typeNumber = 0;
  @Input() showFilter: boolean = false;

  dataSource = new MatTableDataSource<SettingRow>([]);
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
    const service = this.getServiceMethods();
    if (service) {
      service.getAll().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
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
  openDialog(action: DialogAction, row: Partial<SettingRow>): void {
    const dialogRef = this.dialog.open<DialogBoxComponent, DialogBoxData, DialogBoxResult>(DialogBoxComponent, {
      width: '720px',
      maxWidth: '95vw',
      data: { action, actionType: this.typeNumber, row }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      if (!result || result.event === 'Cancel') return;
      // keep the fields the dialog doesn't edit (active, audit fields) when saving
      const item: SettingRow = { ...row, ...result.data };
      if (result.event === 'Add') this.addRow(item);
      else if (result.event === 'Update') this.updateRow(item);
      else if (result.event === 'Delete') this.deleteRow(item);
    });
  }

  // --- CRUD Operations
  private getServiceMethods(): SettingApi | undefined {
    const s = this.settingService;
    const serviceMap: Record<number, SettingApi> = {
      1: { getAll: () => s.getAllInstitutions(), save: item => s.saveInstitution(item), delete: id => s.deleteInstitution(id) },
      2: { getAll: () => s.getAllCampaigns(), save: item => s.saveCampaign(item), delete: id => s.deleteCampaign(id) },
      3: { getAll: () => s.getAllMethods(), save: item => s.saveMethod(item), delete: id => s.deleteMethod(id) },
      4: { getAll: () => s.getAllPrograms(), save: item => s.saveProgram(item), delete: id => s.deleteProgram(id) },
      5: { getAll: () => s.getAllCoworkers(), save: item => s.saveCoworker(item), delete: id => s.deleteCoworker(id) },
      6: { getAll: () => s.getAllEvents(), save: item => s.saveEvent(item), delete: id => s.deleteEvent(id) },
    };
    return serviceMap[this.typeNumber];
  }

  private addRow(data: SettingRow): void {
    this.getServiceMethods()?.save(data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataSource.data = [...this.dataSource.data, res];
    });
  }

  private updateRow(data: SettingRow): void {
    this.getServiceMethods()?.save(data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataSource.data = this.dataSource.data.map(row => row.id === res.id ? res : row);
    });
  }

  private deleteRow(data: SettingRow): void {
    const id = data.id;
    if (isNil(id)) {
      return;
    }
    this.getServiceMethods()?.delete(id).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(row => row.id !== id);
    });
  }

  // --- Toggle active state
  activateToggle(row: SettingRow): void {
    const payload = { ...row, active: !row.active };
    this.getServiceMethods()?.save(payload).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataSource.data = this.dataSource.data.map(r => r.id === res.id ? res : r);
    });
  }

}
