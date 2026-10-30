import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';
import {FormBuilder, Validators} from '@angular/forms';
import {map, switchMap, takeUntil} from 'rxjs/operators';

import {MethodsDTO} from '../../model/MethodsDTO';
import {ProgramDTO} from '../../model/ProgramDTO';
import {EntryService} from '../entry.service';
import {CampaignDTO} from '../../model/CampaignDTO';

import { isNil } from '../../shared/utils/is-nil';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractEnum, ContractEnum2LabelMapping} from '../../model/ContractEnum';


import {CardBasicDTO} from '../../model/CardBasicDTO';
import {ChipsInputComponent} from '../../shared/chips/chips-input.component';
import {CoworkerDTO} from '../../model/CoworkerDTO';
import {EntryDTO} from '../../model/EntryDTO';
import {SettingService} from '../../setting/setting.service';
import {CardService} from '../../card/card.service';
import {forkJoin, of, Subject} from 'rxjs';

// backend expects LocalDateTime, so send the local wall-clock time without any timezone conversion
const BACKEND_DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

type EntryForm = ReturnType<EntryComponent['buildForm']>;

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, OnDestroy {

  @ViewChild('client', {static: false}) clientsControl?: ChipsInputComponent<CardBasicDTO>;
  @ViewChild('otherClientsInput', {static: false}) otherClientsControl?: ChipsInputComponent<CardBasicDTO>;
  @ViewChild('coworkersInput', {static: false}) coworkersControl?: ChipsInputComponent<CoworkerDTO>;
  @ViewChild('methodsInput', {static: false}) methodsControl?: ChipsInputComponent<MethodsDTO>;

  programs: ProgramDTO[] = [];
  methods: MethodsDTO[] = [];
  campaigns: CampaignDTO[] = [];
  contacts: CoworkerDTO[] = [];
  date = new Date(new Date());
  entryEdit?: EntryDTO;
  cards: CardBasicDTO[] = [];
  title = '';
  readonly = false;
  onDestroy$ = new Subject();
  formGroup?: EntryForm;
  public ContractEnum2LabelMapping = ContractEnum2LabelMapping;
  public contactTypes = Object.values(ContractEnum);
  isLoading = false; // Flag to indicate loading state

  @Input() editId: string | null = null;

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
          entry: isNil(editId) ? of(undefined) : this.entryService.getEntry(editId)
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

  onSubmit(): void {
    if (isNil(this.formGroup)) {
      return;
    }
    this.entryService.saveEntry(this.getSaveObject(this.formGroup)).pipe(takeUntil(this.onDestroy$))
      .subscribe(ent => {
      this.entryEdit = ent;
      this.router.navigate([`/entry_line/` + ent.id]);
    });
    this.readonly = !this.readonly;
  }

  getSaveObject(formGroup: EntryForm): EntryDTO {
    const value = formGroup.getRawValue();
    let ret: EntryDTO = {
      ...value,
      contact_type: value.contact_type ?? undefined,
      entry_date_from: this.toBackendDateTime(value.entry_date_from),
      entry_date_to: this.toBackendDateTime(value.entry_date_to)
  };
    if (!isNil(this.clientsControl)) {
        ret.client = this.clientsControl.selectedChips;
    }
    if (!isNil(this.otherClientsControl)) {
        ret.clients_on_site = this.otherClientsControl.selectedChips;
    }
    if (!isNil(this.coworkersControl)) {
        ret.other_workers = this.coworkersControl.selectedChips;
    }
    if (!isNil(this.methodsControl)) {
        ret.work_methods = this.methodsControl.selectedChips;
    }
    return ret;
  }

  private toBackendDateTime(value: Date): string {
    return formatDate(value, BACKEND_DATE_TIME_FORMAT, 'en-US');
  }

  formSetUp() {
    // selected chips are passed to the chips inputs through [selectedData] bindings
    this.formGroup = this.buildForm(this.entryEdit);
  }

  buildForm(entry?: EntryDTO) {
    const fb = this.formBuilder.nonNullable;
    return fb.group({
      id: fb.control<number | undefined>(entry?.id),
      entry_date_from: fb.control(isNil(entry) ? new Date() : new Date(entry.entry_date_from), [Validators.required]),
      entry_date_to: fb.control(isNil(entry) ? new Date() : new Date(entry.entry_date_to), [Validators.required]),
      place: fb.control(entry?.place ?? ''),
      contact_type: fb.control<ContractEnum | null>(entry?.contact_type ?? null),
      campaign: fb.control<CampaignDTO | undefined>(entry?.campaign),
      program_type: fb.control<ProgramDTO | undefined>(entry?.program_type),
      event_description: fb.control(entry?.event_description ?? ''),
      fast_message: fb.control(entry?.fast_message ?? ''),
      // read-only audit fields are sent back unchanged
      created: fb.control(entry?.created),
      updated: fb.control(entry?.updated),
      last_change: fb.control(entry?.last_change),
      createdBy: fb.control(entry?.createdBy)
    });
  }
// function for comparing that is used in mat-select  that selected values what is object is set up correctly
  comparePOptions(o1: ProgramDTO | null, o2: ProgramDTO | null): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareCOptions(o1: CampaignDTO | null, o2: CampaignDTO | null): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  private setUpEntry(entry: EntryDTO | undefined) {
    this.entryEdit = entry;
    this.formSetUp();
    if (!isNil(entry)) {
      this.title = 'Záznam';
      this.readonly = true;
    } else {
      this.title = 'Vytvorenie záznamu';
      this.readonly = false;
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
