import { Component, Input, ViewChild, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { EntryDTO } from '../../model/EntryDTO';
import { PageDTO } from '../../model/PageDTO';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { DialogAction, DialogBoxComponent, DialogBoxData, DialogBoxResult } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { EntryService } from '../../entry/entry.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNil } from '../utils/is-nil';

@Component({
    selector: 'app-table-entry',
    templateUrl: './table-entry.component.html',
    styleUrls: ['./table-entry.component.scss'],
    standalone: false
})

export class TableEntryComponent implements OnChanges, OnDestroy {
  @Input() tableData: EntryDTO[] | null = null;
  @Input() addButton = false;
  // paging is optional: the paginator is shown only when the parent passes server paging info
  @Input() pageble: PageDTO | null = null;
  @Output() pageChange = new EventEmitter<PageEvent>();

  displayedColumns: string[] = ['place', 'entry_date_from', 'campaign', 'program_type', 'createdBy', 'action'];
  dataSource: EntryDTO[] = [];
  expandedElement: EntryDTO | null = null;
  onDestroy$ = new Subject();

  @ViewChild(MatTable, {static: false} ) table?: MatTable<EntryDTO>;
  constructor(private router: Router, public dialog: MatDialog,
                private entryService: EntryService,) {}

  // the table shows dataSource, so a deleted row disappears right away
  ngOnChanges(): void {
      this.dataSource = isNil(this.tableData) ? [] : [...this.tableData];
  }

  redirectUrl(obj_row: EntryDTO): void {
     this.router.navigate([`/entry_line/` + obj_row.id]);
  }

  openDialog (action: DialogAction, row: EntryDTO | Record<string, never>) {
    const dialogRef = this.dialog.open<DialogBoxComponent, DialogBoxData, DialogBoxResult>(DialogBoxComponent, {
      width: '720px',
      height : 'auto',
      data: { action, actionType: 8, row }
  });

  dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      if (result?.event === 'Delete' && !isNil(row.id)) {
        this.deleteRowData(row.id);
      }
    });
  }

  deleteRowData(id: number) {
        this.entryService.deleteEntry(id).pipe(takeUntil(this.onDestroy$))
            .subscribe(() => {
                this.dataSource = this.dataSource.filter(value => value.id !== id);
            });
    }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
