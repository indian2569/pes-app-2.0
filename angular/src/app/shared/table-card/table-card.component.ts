import { Component, Input, ViewChild, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { CardBasicDTO } from '../../model/CardBasicDTO';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAction, DialogBoxComponent, DialogBoxData, DialogBoxResult } from '../dialog-box/dialog-box.component';
import { MatTable } from '@angular/material/table';
import { CardService } from '../../card/card.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNil } from '../utils/is-nil';
import { PageEvent } from '@angular/material/paginator';
import { PageDTO } from '../../model/PageDTO';

@Component({
    selector: 'app-table-card',
    templateUrl: './table-card.component.html',
    styleUrls: ['./table-card.component.scss'],
    standalone: false
})

export class TableCardComponent implements OnChanges, OnDestroy {


    @Input() tableData: CardBasicDTO[] | null = null;
    @Input() pageble: PageDTO | null = null;
    @Output() pageChange = new EventEmitter<PageEvent>();
    displayedColumns: string[] = ['client_nick', 'client_gender', 'client_age', 'client_birth_year', 'cratedBy', 'status', 'action'];
    dataSource: CardBasicDTO[] = [];
    onDestroy$ = new Subject();

    @ViewChild(MatTable, {static: false} ) table?: MatTable<CardBasicDTO>;
  pageEvent?: PageEvent;
  length = 0;
  pageSize = 0;
  pageIndex = 0;
    constructor(public dialog: MatDialog,
                private cardService: CardService,
                private router: Router) {
                }

    // the table shows dataSource, so rows removed or toggled here stay in sync with new pages from the parent
    ngOnChanges(): void {
      this.dataSource = isNil(this.tableData) ? [] : [...this.tableData];
    }

    redirectUrl(obj_row: CardBasicDTO): void {
     this.router.navigate([`/card_line/` + obj_row.id]);
    }

  redirectUrlNew(): void {
    this.router.navigate([`/card_line/add_cards`]);
  }

    openDialog (action: DialogAction, row: CardBasicDTO) {
    const dialogRef = this.dialog.open<DialogBoxComponent, DialogBoxData, DialogBoxResult>(DialogBoxComponent, {
      width: '720px',
      height : 'auto',
      data: { action, actionType: 7, row }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      if (result?.event === 'Delete') {
        this.deleteRowData(row);
      }
    });
  }

  deleteRowData(row_obj: CardBasicDTO) {
    if (isNil(row_obj.id)) {
      return;
    }
    this.cardService.deleteCard(row_obj.id).pipe(takeUntil(this.onDestroy$))
    .subscribe(() => {
        this.dataSource = this.dataSource.filter(value => value.id !== row_obj.id);
    });
  }

  activateTogle(row_obj: CardBasicDTO) {
    if (isNil(row_obj.id)) {
      return;
    }
    this.cardService.togleActivateCards(row_obj.id).pipe(takeUntil(this.onDestroy$))
    .subscribe(updatedCard => {
        const index = this.dataSource.findIndex(c => c.id === updatedCard.id);
        if (index > -1) {
            this.dataSource[index] = updatedCard;
            this.table?.renderRows();
        }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.pageChange.emit(e);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
