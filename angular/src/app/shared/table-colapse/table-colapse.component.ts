import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InstitutionDTO } from '../../model/InstitutionDTO';
import { SettingDTO } from '../../model/SettingDTO';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SettingService } from '../../setting/setting.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { isNil } from '../utils/is-nil';
import { CardService } from '../../card/card.service';
import { EntryService } from '../../entry/entry.service';

@Component({
  selector: 'app-table-colapse',
  templateUrl: './table-colapse.component.html',
  styleUrls: ['./table-colapse.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

  export class TableColapseComponent implements OnInit, OnDestroy {

    @Input() tableData: InstitutionDTO[] = [];
    @Input() typeNumber = 0;
    dataSource: InstitutionDTO[] = [];
    columnsToDisplay = ['name'];
    expandedElement: InstitutionDTO | null = null;
    result = false;
    onDestroy$ = new Subject();

  constructor(private dialog: MatDialog,
              private settingService: SettingService,
              private cardService: CardService,
              private entryService: EntryService) { }

    ngOnInit(): void {
      this.dataSource = isNil(this.tableData) ? [] : this.tableData;
      this.columnsSetUpBaseOnType(this.typeNumber);
    }

    columnsSetUpBaseOnType(typeNumber: number) {
     switch (typeNumber) {
        case 1:
          this.columnsToDisplay = ['Nazov institucie'];
          break;
        case 2:
          this.columnsToDisplay = ['Názov kampaňe'];
          break;
        case 3:
          this.columnsToDisplay = ['Názov metódy'];
          break;
        case 4:
          this.columnsToDisplay = ['Názov programu'];
          break;
        case 5:
          this.columnsToDisplay = ['Meno pracovníka','Pozícia pracovníka'];
          break;
        case 6:
          this.columnsToDisplay = ['Názov udalosti'];
          break;
     }
  }

    editItem(id: string) {
        let editItem: SettingDTO | undefined;
        this.settingService.forType(this.typeNumber)?.get(id).pipe(takeUntil(this.onDestroy$))
            .subscribe((item) => editItem = item);
    }

  confirmDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px'
    });
    dialogRef.componentInstance.title = 'Vymazanie položky';
    dialogRef.componentInstance.message = 'Naozaj chceš vymazať túto položku?';
    dialogRef.componentInstance.btnOkText = 'Vymazať'; 
    dialogRef.componentInstance.btnCancelText = 'Spať';
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$))
      .subscribe((dialogResult: boolean | undefined) => {
      this.result = dialogResult === true;
      if (this.result) {
        this.deleteItem(id);
      }
    });
  }

    // only setting lists (types 1-6) can be deleted here; unknown types do nothing
    deleteItem(id: string) {
        this.settingService.forType(this.typeNumber)?.delete(id).pipe(takeUntil(this.onDestroy$))
            .subscribe();
    }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
