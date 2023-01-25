import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CardBasicDTO } from '../../model/CardBasicDTO';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatTable } from '@angular/material/table';
import { CardService } from '../../card/card.service';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
})

export class TableCardComponent implements OnInit {
    @Input() tableData: CardBasicDTO[];
    displayedColumns: string[] = ['client_nick', 'client_gender', 'clint_age', 'client_birth_year', 'cratedBy', 'status', 'action'];
    dataSource: CardBasicDTO[];

    @ViewChild(MatTable, {static: true} ) table: MatTable<any>;
    constructor(public dialog: MatDialog,
                private cardService: CardService,
                private router: Router) {}

    ngOnInit(): void {
      this.dataSource = this.tableData;
    }

    redirectUrl(obj_row): void {
     this.router.navigate([`/card_line/` + obj_row.id]);
    }

    openDialog (action, obj) {
    obj.action = action;
    obj.actionType = 7;
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
    this.cardService.deleteCard(row_obj.id).subscribe(sub => this.table.renderRows());
  }
}
