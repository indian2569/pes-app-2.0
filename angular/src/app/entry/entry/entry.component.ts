import { Component, OnInit, ViewChild,  Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map,  startWith, takeUntil} from 'rxjs/operators';

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
import { Observable, Subject, async } from 'rxjs';
import { SelectInputComponent } from '../../shared/select/select-input.component';

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
  @ViewChild('campaignInput', {static: false}) campaignControl: SelectInputComponent;

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
    this.formSetUp();
    this.route.url.pipe(takeUntil(this.onDestroy$))
      .subscribe((params: any) => {
        if (params[0].path !== 'add_entry' && params.length > 0) {
          this.editId = params[0].path;
        }
      });
    this.settingService.getAllMethods().pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => {
          this.methods = data;
          this.methodsControl.allAvaliableChips = this.methods;
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

   }

   async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      await this.loadData();
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading programs or entry', error);
      this.isLoading = false;
    }
    console.log(this.programs, this.campaigns);
    console.log(`Type: ${typeof this.campaigns[1]}`, this.campaigns[1]);

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
  }

  getSaveObject(): EntryDTO {
    let ret: EntryDTO = {
      ...this.formGroup.getRawValue(),
      entry_date_from: this.formGroup.get('entry_date_from').value.toISOString().slice(0, 19),
      entry_date_to: this.formGroup.get('entry_date_to').value.toISOString().slice(0, 19)
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
    if (!_.isNil(this.entryEdit)) {
        this.clientsControl.selectedChips =  _.isNil(this.entryEdit.client) ? [] : this.entryEdit.client;
        this.otherClientsControl.selectedChips = _.isNil(this.entryEdit.clients_on_site) ? [] : this.entryEdit.clients_on_site;
        this.coworkersControl.selectedChips = _.isNil(this.entryEdit.other_workers) ? [] : this.entryEdit.other_workers;
        this.methodsControl.selectedChips = _.isNil(this.entryEdit.work_methods) ? [] : this.entryEdit.work_methods;
        this.selectedCampagne = this.entryEdit.campaign;
        this.selectedProgram = this.entryEdit.program_type;
    }
  }

  comparePOptions(o1: ProgramDTO, o2: ProgramDTO): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareCOptions(o1: CampaignDTO, o2: CampaignDTO): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  async loadData() {
    try {
      this.programs = await this.settingService.getAllPrograms().toPromise();
      this.campaigns = await this.settingService.getAllCampaigns().toPromise();
      await this.setUpEntry(this.editId);
    } catch (error) {
      console.error('Error loading settings', error);
    }
  }

  async setUpEntry(editId: string) {
    if (!_.isNil(editId)) {
      try {
        const entryReaded = await this.entryService.getEntry(editId).toPromise();
        this.entryEdit = entryReaded;
        this.formSetUp();
        this.title = 'Záznam';
        this.readonly = true;
        this.fillClientOnSite();
      } catch (error) {
        console.error('Error loading entry', error);
      }
  } else {
      this.formSetUp();
      this.title = 'Vytvorenie záznamu';
      this.readonly = _.isNil(editId) ? false : true;
      this.fillClientOnSite();
  }
  }

  onMakeEditable () {
    this.readonly = !this.readonly;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

}
