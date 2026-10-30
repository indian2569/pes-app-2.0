import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith, switchMap, takeUntil} from 'rxjs/operators';

import {MethodsDTO} from '../../model/MethodsDTO';
import {ProgramDTO} from '../../model/ProgramDTO';
import {EntryService} from '../entry.service';
import {CampaignDTO} from '../../model/CampaignDTO';

import * as _ from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractEnum, ContractEnum2LabelMapping} from '../../model/ContractEnum';


import {CardBasicDTO} from '../../model/CardBasicDTO';
import {ChipsInputComponent} from '../../shared/chips/chips-input.component';
import {CoworkerDTO} from '../../model/CoworkerDTO';
import {EntryDTO} from '../../model/EntryDTO';
import {SettingService} from '../../setting/setting.service';
import {CardService} from '../../card/card.service';
import {forkJoin, Observable, of, Subject} from 'rxjs';

// backend expects LocalDateTime, so send the local wall-clock time without any timezone conversion
const BACKEND_DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, OnDestroy {

  @ViewChild('client', {static: false}) clientsControl: ChipsInputComponent;
  @ViewChild('otherClientsInput', {static: false}) otherClientsControl: ChipsInputComponent;
  @ViewChild('coworkersInput', {static: false}) coworkersControl: ChipsInputComponent;
  @ViewChild('methodsInput', {static: false}) methodsControl: ChipsInputComponent;

  programs: any[];
  methods: MethodsDTO[] ;
  campaigns: any[];
  contacts: CoworkerDTO[];
  date = new Date(new Date());
  entryEdit: EntryDTO;
  cards: CardBasicDTO[];
  filteredClients: Observable<CardBasicDTO[]>;
  title: string;
  readonly: boolean;
  selectedCampagne: CampaignDTO;
  selectedProgram: ProgramDTO;
  selectedMethod: MethodsDTO;
  onDestroy$ = new Subject();
  formGroup: FormGroup;
  public ContractEnum2LabelMapping = ContractEnum2LabelMapping;
  public contactTypes = Object.values(ContractEnum);
  isLoading = false; // Flag to indicate loading state

  @Input() editId: string;

  constructor(private entryService: EntryService,
              private settingService: SettingService,
              private cardService: CardService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
   }

  ngOnInit(): void {
    // option lists for the chips inputs are passed to them through [dataSet] bindings
    this.settingService.getAllMethods().pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => this.methods = data,
        error: (e) => console.error(e)
      });
    this.settingService.getAllCoworkers().pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => this.contacts = data,
        error: (e) => console.error(e)
      });
    this.cardService.getAllCards().pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => this.cards = data[0].results,
        error: (e) => console.error(e)
      });

    this.route.paramMap.pipe(
      map(params => params.get('id') ?? this.editId),
      switchMap(editId => {
        this.isLoading = true;
        this.editId = editId;
        return forkJoin({
          programs: this.settingService.getAllPrograms(),
          campaigns: this.settingService.getAllCampaigns(),
          entry: _.isNil(editId) ? of(undefined) : this.entryService.getEntry(editId)
        });
      }),
      takeUntil(this.onDestroy$)
    ).subscribe({
      next: ({programs, campaigns, entry}) => {
        this.programs = programs;
        this.campaigns = campaigns;
        this.setUpEntry(entry);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading programs or entry', error);
        this.isLoading = false;
      }
    });
  }

  private fillClientOnSite() {
    if (!_.isNil(this.formGroup.get('clients_on_site'))) {
      this.filteredClients = this.formGroup.get('clients_on_site').valueChanges.pipe(
        startWith(''), map(value => this._filter(value || '')));
    }
  }

  onSubmit(): void {
    this.entryService.saveEntry(this.getSaveObject()).pipe(takeUntil(this.onDestroy$))
      .subscribe(ent => {
      this.entryEdit = ent;
      this.router.navigate([`/entry_line/` + ent.id]);
    });
    this.readonly = !this.readonly;
  }

  getSaveObject(): EntryDTO {
    let ret: EntryDTO = {
      ...this.formGroup.getRawValue(),
      entry_date_from: this.toBackendDateTime(this.formGroup.get('entry_date_from').value),
      entry_date_to: this.toBackendDateTime(this.formGroup.get('entry_date_to').value)
  };
    if (!_.isNil(this.clientsControl)) {
        ret.client = this.clientsControl.selectedChips;
    }
    if (!_.isNil(this.otherClientsControl)) {
        ret.clients_on_site = this.otherClientsControl.selectedChips;
    }
    if (!_.isNil(this.coworkersControl)) {
        ret.other_workers = this.coworkersControl.selectedChips;
    }
    if (!_.isNil(this.methodsControl)) {
        ret.work_methods = this.methodsControl.selectedChips;
    }
    return ret;
  }

  private toBackendDateTime(value: Date): string {
    return formatDate(value, BACKEND_DATE_TIME_FORMAT, 'en-US');
  }

  private _filter(value: string): CardBasicDTO[] {
    const filterValue = this._normalizeValue(value);
    return this.cards.filter(street => this._normalizeValue(street.client_name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  formSetUp() {
    this.formGroup = this.formBuilder.group({
      id: new FormControl(_.isNil(this.entryEdit) ? undefined : this.entryEdit.id),
      client: new FormControl(_.isNil(this.entryEdit) ? [] : this.entryEdit.client),
      clients_on_site: new FormControl(_.isNil(this.entryEdit) ? [] : this.entryEdit.clients_on_site),
      entry_date_from: new FormControl(_.isNil(this.entryEdit) ? new Date() : new Date(this.entryEdit.entry_date_from), [Validators.required]),
      entry_date_to: new FormControl(_.isNil(this.entryEdit) ? new Date() : new Date(this.entryEdit.entry_date_to), [Validators.required]),
      //duration: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.duration),
      place: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.place),
      contact_type: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.contact_type),
      campaign: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.campaign),
      program_type: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.program_type),
      work_methods: new FormControl(_.isNil(this.entryEdit) ? [] : this.entryEdit.work_methods),
      other_workers: new FormControl(_.isNil(this.entryEdit) ? [] : this.entryEdit.other_workers),
      event_description: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.event_description),
      fast_message: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.fast_message),
      created: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.created),
      updated: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.updated),
      last_change: new FormControl(_.isNil(this.entryEdit) ? undefined : this.entryEdit.last_change),
      createdBy: new FormControl(_.isNil(this.entryEdit) ? undefined : this.entryEdit.createdBy)

    });
    // selected chips are passed to the chips inputs through [selectedData] bindings
    if (!_.isNil(this.entryEdit)) {
        this.selectedCampagne = this.entryEdit.campaign;
        this.selectedProgram = this.entryEdit.program_type;
    }
  }
// function for comparing that is used in mat-select  that selected values what is object is set up correctly
  comparePOptions(o1: ProgramDTO, o2: ProgramDTO): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareCOptions(o1: CampaignDTO, o2: CampaignDTO): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  private setUpEntry(entry: EntryDTO | undefined) {
    this.entryEdit = entry;
    this.formSetUp();
    if (!_.isNil(entry)) {
      this.title = 'Záznam';
      this.readonly = true;
    } else {
      this.title = 'Vytvorenie záznamu';
      this.readonly = false;
    }
    this.fillClientOnSite();
  }

  onMakeEditable () {
    this.readonly = !this.readonly;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

}
