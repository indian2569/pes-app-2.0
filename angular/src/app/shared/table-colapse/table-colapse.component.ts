import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InstitutionDTO } from '../../model/InstitutionDTO';
import { TableHeaderDTO } from '../../model/TableHeaderDTO';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SettingService } from '../../setting/setting.service';

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

  export class TableColapseComponent implements OnInit {

    @Input() tableData: InstitutionDTO[];
    @Input() typeNumber: number;
    dataSource: InstitutionDTO[];
    columnsToDisplay = ['name'];
    expandedElement: InstitutionDTO | null;
    result: string = '';

  constructor(private dialog: MatDialog,
              private settingService: SettingService) { }

    ngOnInit(): void {
      this.dataSource = this.tableData;
      this.columnsSetUpBaseOnType(this.typeNumber);
      console.log(this.columnsToDisplay);
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
          this.settingService.getInstitution(id.toString()).subscribe((item) => editItem = item);
          break;
        case 2:
          this.settingService.getCampaign(id.toString()).subscribe((item) => editItem = item);
          break;
        case 3:
          this.settingService.getMethod(id.toString()).subscribe((item) => editItem = item);
          break;
        case 4:
          this.settingService.getProgram(id.toString()).subscribe((item) => editItem = item);
          break;
        case 5:
          this.settingService.getCoworker(id.toString()).subscribe((item) => editItem = item);
          break;
        case 6:
          this.settingService.getEvent(id.toString()).subscribe((item) => editItem = item);
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
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.deleteItem(id);
      }
    });
  }

  deleteItem(id: number) {
    console.log(id);
     switch (this.typeNumber) {
        case 1:
          this.settingService.deleteInstitution(id.toString()).subscribe();
          break;
        case 2:
          this.settingService.deleteCampaign(id.toString()).subscribe();
          break;
        case 3:
          this.settingService.deleteMethod(id.toString()).subscribe();
          break;
        case 4:
          this.settingService.deleteProgram(id.toString()).subscribe();
          break;
        case 5:
          this.settingService.deleteCoworker(id.toString()).subscribe();
          break;
        case 6:
          this.settingService.deleteEvent(id.toString()).subscribe();
          break;
     }
  }
}
