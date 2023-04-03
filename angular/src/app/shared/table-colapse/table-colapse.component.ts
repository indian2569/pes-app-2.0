import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InstitutionDTO } from '../../model/InstitutionDTO';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SettingService } from '../../setting/setting.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as _ from "lodash";

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

    @Input() tableData: InstitutionDTO[];
    @Input() typeNumber: number;
    dataSource: InstitutionDTO[];
    columnsToDisplay = ['name'];
    expandedElement: InstitutionDTO | null;
    result = '';
    onDestroy$ = new Subject();

  constructor(private dialog: MatDialog,
              private settingService: SettingService) { }

    ngOnInit(): void {
      this.dataSource = _.isNil(this.tableData) ? [] : this.tableData;
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

    editItem(id: number) {
        let editItem;
        switch (this.typeNumber) {
            case 1:
                this.settingService.getInstitution(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe((item) => editItem = item);
                break;
            case 2:
                this.settingService.getCampaign(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe((item) => editItem = item);
                break;
            case 3:
                this.settingService.getMethod(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe((item) => editItem = item);
                break;
            case 4:
                this.settingService.getProgram(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe((item) => editItem = item);
                break;
            case 5:
                this.settingService.getCoworker(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe((item) => editItem = item);
                break;
            case 6:
                this.settingService.getEvent(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe((item) => editItem = item);
                break;
        }
    }

  confirmDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px'
    });
    dialogRef.componentInstance.title = 'Vymazanie položky';
    dialogRef.componentInstance.message = 'Naozaj chceš vymazať túto položku?';
    dialogRef.componentInstance.btnOkText = 'Vymazať'; 
    dialogRef.componentInstance.btnCancelText = 'Spať';
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$))
      .subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.deleteItem(id);
      }
    });
  }

    deleteItem(id: number) {
        switch (this.typeNumber) {
            case 1:
                this.settingService.deleteInstitution(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe();
                break;
            case 2:
                this.settingService.deleteCampaign(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe();
                break;
            case 3:
                this.settingService.deleteMethod(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe();
                break;
            case 4:
                this.settingService.deleteProgram(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe();
                break;
            case 5:
                this.settingService.deleteCoworker(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe();
                break;
            case 6:
                this.settingService.deleteEvent(id.toString()).pipe(takeUntil(this.onDestroy$))
                    .subscribe();
                break;
        }
    }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
