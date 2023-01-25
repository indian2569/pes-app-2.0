import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EntryDTO } from '../../model/EntryDTO';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { EntryService } from '../../entry/entry.service';

@Component({
  selector: 'app-table-entry',
  templateUrl: './table-entry.component.html',
  styleUrls: ['./table-entry.component.scss'],
})

export class TableEntryComponent implements OnInit  {
  @Input() tableData: EntryDTO[];
  displayedColumns: string[] = ['place', 'entry_date_from', 'campaign', 'program_type', 'cratedBy', 'action'];
  dataSource: EntryDTO[];
  expandedElement: EntryDTO | null;

  @ViewChild(MatTable, {static: true} ) table: MatTable<any>;
  constructor(private router: Router, public dialog: MatDialog,
                private entryService: EntryService,) {}

  ngOnInit(): void {
      this.dataSource = this.tableData;
    }

  redirectUrl(obj_row): void {
     this.router.navigate([`/entry_line/` + obj_row.id]);
  }

  openDialog (action, obj) {
    obj.action = action;
    obj.actionType = 8;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '720px',
      height : 'auto',
      data: obj
  });

  dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== row_obj.id;
    });
    this.entryService.deleteEntry(row_obj.id).subscribe(sub => this.table.renderRows());
  }
  }
