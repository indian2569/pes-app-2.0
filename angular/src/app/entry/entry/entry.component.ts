import { Component, OnInit, ViewChild,  Input, OnDestroy } from '@angular/core';
import { FormControl,  Validators, FormBuilder } from '@angular/forms';
import { map,  startWith} from 'rxjs/operators';

import { MethodsDTO } from '../../model/MethodsDTO';
import { ProgramDTO } from '../../model/ProgramDTO';
import { EntryService } from '../entry.service';
import { CampaignDTO } from '../../model/CampaignDTO';

import * as _ from 'lodash';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import {ContractEnum, ContractEnum2LabelMapping} from '../../model/ContractEnum';


import { CardBasicDTO } from '../../model/CardBasicDTO';
import { ChipsInputComponent } from '../../shared/chips/chips-input.component';
import { CoworkerDTO } from '../../model/CoworkerDTO';
import { EntryDTO } from '../../model/EntryDTO';
import { SettingService } from '../../setting/setting.service';
import { CardService } from '../../card/card.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  programs: ProgramDTO[];
  methods: MethodsDTO[] ;
  campaigns: CampaignDTO[];
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

  public ContractEnum2LabelMapping = ContractEnum2LabelMapping;
  public contactTypes = Object.values(ContractEnum);

  public formGroup =  this.formBuilder.group({
    client: new FormControl(),
    clint_on_site: new FormControl(),
    entry_date_from: new FormControl(this.date),
    entry_date_to: new FormControl(this.date),
    place: new FormControl(),
    contact_type: new FormControl(),
    campaign: new FormControl(),
    program_type: new FormControl(),
    work_methods: new FormControl(),
    other_workers: new FormControl(),
    event_description: new FormControl(),
    fast_message: new FormControl(),
  });

  @Input() editId: string;

  constructor(private entryService: EntryService,
              private settingService: SettingService,
              private cardService: CardService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
   }

  ngOnInit(): void {
    this.route.url.pipe(takeUntil(this.onDestroy$))
      .subscribe((params: any) => {
        if (params[0].path !== 'add_entry' && params.length > 0) {
          this.editId = params[0].path;
        }
      });
    this.settingService.getAllPrograms().pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => {
          this.programs = data;
        },
        error: (e) => console.error(e)
      });
    this.settingService.getAllMethods().pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => {
          this.methods = data;
          this.methodsControl.allAvaliableChips = this.methods;
        },
        error: (e) => console.error(e)
      });
    this.settingService.getAllCampaigns().pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => {
          this.campaigns = data;
        },
        error: (e) => console.error(e)
      });
    this.settingService.getAllCoworkers().pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => {
          this.contacts = data;
          this.coworkersControl.allAvaliableChips = this.contacts;
        },
        error: (e) => console.error(e)
      });
    this.cardService.getAllCards().pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => {
          this.cards = data;
          this.otherClientsControl.allAvaliableChips = this.cards;
          this.clientsControl.allAvaliableChips = this.cards;
        },
        error: (e) => console.error(e)
      });
    if (!_.isNil(this.formGroup.get('clients_on_site'))) {
      this.filteredClients = this.formGroup.get('clients_on_site').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    }
    if (!_.isNil(this.editId)) {
      this.entryService.getEntry(this.editId).pipe(takeUntil(this.onDestroy$))
      .subscribe(card => {
        this.entryEdit = card;
        this.formSetUp();
        this.title = 'Záznam';
        this.readonly = true;
      });
    } else {
      this.formSetUp();
      this.title = 'Vytvorenie záznamu';
      this.readonly = false;
    }
  }

  onSubmit(): void {
    this.entryService.saveEntry(this.getSaveObject()).pipe(takeUntil(this.onDestroy$))
      .subscribe(ent => {
      this.entryEdit = ent;
      this.router.navigate([`/entry_line/` + ent.id]);
    });
  }

  getSaveObject(): EntryDTO {
    const ret: EntryDTO = this.formGroup.getRawValue();

    ret.entry_date_from = this.transformToMoment(this.formGroup.get('entry_date_from').value).toISOString().slice(0, 19);
    ret.entry_date_to = this.transformToMoment(this.formGroup.get('entry_date_to').value).toISOString().slice(0, 19);
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
    console.log(ret);
    return ret;
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
      entry_date_from: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.entry_date_from, [Validators.required]),
      entry_date_to: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.entry_date_to, [Validators.required]),
      duration: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.duration),
      place: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.place),
      contact_type: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.contact_type),
      campaign: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.campaign),
      program_type: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.program_type),
      work_methods: new FormControl(_.isNil(this.entryEdit) ? [] : this.entryEdit.work_methods),
      other_workers: new FormControl(_.isNil(this.entryEdit) ? [] : this.entryEdit.other_workers),
      event_description: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.event_description),
      fast_message: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.fast_message),
      createdBy: new FormControl(_.isNil(this.entryEdit) ? '' : this.entryEdit.createdBy)
    });
    if (!_.isNil(this.entryEdit)) {
        this.clientsControl.selectedChips = this.entryEdit.client;
        this.otherClientsControl.selectedChips = this.entryEdit.clients_on_site;
        this.coworkersControl.selectedChips = this.entryEdit.other_workers;
        this.methodsControl.selectedChips = this.entryEdit.work_methods;
        this.formGroup.get('campaign').setValue(this.entryEdit.campaign);
        this.selectedCampagne = this.entryEdit.campaign;
        this.selectedProgram = this.entryEdit.program_type;
    }
  }

  transformToMoment = (value: string | moment.Moment): moment.Moment => {
    if (_.isNil(value)) {
      return null;
    }
    let date: moment.Moment;
    if (typeof value === 'object' ) {
      date = moment.utc(value);
    }
    return date;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
