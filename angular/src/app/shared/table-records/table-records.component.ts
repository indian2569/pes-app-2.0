import { Component, ViewChild, Input, OnInit } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntryDTO } from '../../model/EntryDTO';

import { isNil } from '../utils/is-nil';
import { EntryService } from '../../entry/entry.service';

// TODO: component is not used yet, its row actions are not implemented
@Component({
  selector: 'app-table-records',
  templateUrl: './table-records.component.html',
  styleUrls: ['./table-records.component.scss']
})
export class TableRecordsComponent implements OnInit {

  dataSource: EntryDTO[] = [];
  havePosition = false;

  @ViewChild(MatTable, {static: true} ) table?: MatTable<EntryDTO>;
  @Input() tableData: EntryDTO[] | null = null;

  displayedColumns: string[] = ['entry_date_from', 'place', 'duration' , 'createdBy', 'program_type', 'action'];
  constructor(public dialog: MatDialog,
              private entryService: EntryService) {}

  ngOnInit(): void {
      this.dataSource = isNil(this.tableData) ? [] : this.tableData;
  }

  // TODO: open the update/delete dialog, the template already binds the buttons to it
  openDialog(action: 'Update' | 'Delete', row_obj: EntryDTO) {

  }

  addRowData(row_obj: EntryDTO) {

  }

  updateRowData(row_obj: EntryDTO) {

  }

  deleteRowData(row_obj: EntryDTO) {

  }

}
