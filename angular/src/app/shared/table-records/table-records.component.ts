import { Component, ViewChild, Input, OnInit } from '@angular/core';

import { MatLegacyTable as MatTable } from '@angular/material/legacy-table';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { EntryDTO } from '../../model/EntryDTO';

import * as _ from "lodash";
import { EntryService } from '../../entry/entry.service';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-table-records',
  templateUrl: './table-records.component.html',
  styleUrls: ['./table-records.component.scss']
})
export class TableRecordsComponent implements OnInit {

  dataSource: any[];
  havePosition = false;

  @ViewChild(MatTable, {static: true} ) table: MatTable<any>;
  @Input() tableData: EntryDTO[];

  displayedColumns: string[];
  constructor(public dialog: MatDialog,
              private entryService: EntryService) {}

  ngOnInit(): void {
    this.displayedColumns = ['entry_date_from', 'place', 'duration' , 'createdBy', 'program_type', 'action'];
      this.dataSource = _.isNil(this.tableData) ? [] : this.tableData;
  }

  addRowData(row_obj) {

  }

  updateRowData(row_obj) {

  }

  deleteRowData(row_obj) {

  }

}
