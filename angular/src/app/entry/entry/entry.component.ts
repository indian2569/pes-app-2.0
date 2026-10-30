import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
import {CoworkerDTO} from '../../model/CoworkerDTO';
import {EntryDTO} from '../../model/EntryDTO';
import {SettingService} from '../../setting/setting.service';
import {CardService} from '../../card/card.service';
import {forkJoin, of, Subject} from 'rxjs';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {DATE_TIME_FORMATS} from '../../config/custom.date.adapter';

// backend expects LocalDateTime, so send the local wall-clock time without any timezone conversion
const BACKEND_DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

type EntryForm = ReturnType<EntryComponent['buildForm']>;

const CHIPS_CONTROLS = ['client', 'clients_on_site', 'work_methods', 'other_workers'] as const;

@Component({
    selector: 'app-entry',
    templateUrl: './entry.component.html',
    styleUrls: ['./entry.component.scss'],
    standalone: false,
    // the date fields of an entry show the time too
    providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_TIME_FORMATS }]
})
export class EntryComponent implements OnInit, OnDestroy {

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
    this.settingService.methods.getAll().pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => this.methods = data,
        error: (e) => console.error(e)
      });
    this.settingService.coworkers.getAll().pipe(takeUntil(this.onDestroy$))
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
          programs: this.settingService.programs.getAll(),
          campaigns: this.settingService.campaigns.getAll(),
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
        // the error interceptor already told the user what went wrong, leave the empty form for the list
        this.router.navigate(['/entry_line']);
      }
    });
  }

  onSubmit(): void {
    if (isNil(this.formGroup)) {
      return;
    }
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.entryService.saveEntry(this.getSaveObject(this.formGroup)).pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: ent => {
          this.entryEdit = ent;
          // lock the form only once the backend saved it; on an error it stays editable with the user's changes
          this.setReadonly(true);
          this.router.navigate([`/entry_line/` + ent.id]);
        },
        // the error interceptor already told the user what went wrong
        error: () => undefined
      });
  }

  getSaveObject(formGroup: EntryForm): EntryDTO {
    const value = formGroup.getRawValue();
    return {
      ...value,
      contact_type: value.contact_type ?? undefined,
      entry_date_from: this.toBackendDateTime(value.entry_date_from),
      entry_date_to: this.toBackendDateTime(value.entry_date_to)
    };
  }

  private toBackendDateTime(value: Date): string {
    return formatDate(value, BACKEND_DATE_TIME_FORMAT, 'en-US');
  }

  formSetUp() {
    this.formGroup = this.buildForm(this.entryEdit);
  }

  buildForm(entry?: EntryDTO) {
    const fb = this.formBuilder.nonNullable;
    return fb.group({
      id: fb.control<number | undefined>(entry?.id),
      // bound to <app-chips-input formControlName>, the value is the list of selected options
      client: fb.control<CardBasicDTO[]>(entry?.client ?? []),
      clients_on_site: fb.control<CardBasicDTO[]>(entry?.clients_on_site ?? []),
      work_methods: fb.control<MethodsDTO[]>(entry?.work_methods ?? []),
      other_workers: fb.control<CoworkerDTO[]>(entry?.other_workers ?? []),
      entry_date_from: fb.control(isNil(entry) ? new Date() : new Date(entry.entry_date_from), [Validators.required]),
      entry_date_to: fb.control(isNil(entry) ? new Date() : new Date(entry.entry_date_to), [Validators.required]),
      place: fb.control(entry?.place ?? ''),
      contact_type: fb.control<ContractEnum | null>(entry?.contact_type ?? null),
      // required by the backend (entry.campaign_id and entry.program_type_id are NOT NULL)
      campaign: fb.control<CampaignDTO | undefined>(entry?.campaign, [Validators.required]),
      program_type: fb.control<ProgramDTO | undefined>(entry?.program_type, [Validators.required]),
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
      this.setReadonly(true);
    } else {
      this.title = 'Vytvorenie záznamu';
      this.setReadonly(false);
    }
  }

  onMakeEditable () {
    this.setReadonly(!this.readonly);
  }

  // inputs and selects follow the readonly flag in the template, the chips inputs are disabled through their controls
  private setReadonly(readonly: boolean) {
    this.readonly = readonly;
    for (const name of CHIPS_CONTROLS) {
      const control = this.formGroup?.controls[name];
      if (readonly) {
        control?.disable();
      } else {
        control?.enable();
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

}
