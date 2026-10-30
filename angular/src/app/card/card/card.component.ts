import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardService } from '../card.service';
import { EntryService} from '../../entry/entry.service';
import { catchError, map, tap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { isNil } from '../../shared/utils/is-nil';
import { CardBasicDTO } from '../../model/CardBasicDTO';
import { EMPTY, Subject } from 'rxjs';
import { SettingService } from '../../setting/setting.service';
import { InstitutionDTO } from '../../model/InstitutionDTO';
import { EntryDTO } from '../../model/EntryDTO';

type CardForm = ReturnType<CardComponent['buildForm']>;

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    standalone: false
})
export class CardComponent implements OnInit, OnDestroy {

  basicInfo = false;
  contactInfo = false;
  otherInfo = false;
  workInfo = false;
  insertCard?: CardBasicDTO;
  formGroup?: CardForm;
  title = '';
  readonly = false;
  haveObject$ = false;
  institutions: InstitutionDTO[] = [];
  entrySet: EntryDTO[] = [];
  entryOnSiteSet: EntryDTO[] = [];
  errorMessages: string[] = [];
  
  onDestroy$ = new Subject();

  @Input() editId: string | null = null;

  constructor(private cardService: CardService,
			  private entryService: EntryService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private settingService: SettingService,
              private router: Router) {}

  ngOnInit(): void {
    this.settingService.institutions.getAll().pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => {
          this.institutions = data;
        },
        error: (e) => console.error(e)
      });
    // ':id' route has the card id, 'add_cards' has no id and opens an empty card
    this.route.paramMap
      .pipe(map(params => params.get('id') ?? this.editId), takeUntil(this.onDestroy$))
      .subscribe(editId => {
        this.editId = editId;
        if (!isNil(editId)) {
          this.cardService.getCard(editId)
            .pipe(
              // the error interceptor already told the user what went wrong, go back to the list
              catchError(() => {
                this.router.navigate(['/card_line/all_cards']);
                return EMPTY;
              }),
              takeUntil(this.onDestroy$)
            ).subscribe(card => {
                this.insertCard = card;
                this.formSetUp();
                this.title = 'Karta klienta';
                this.readonly = true;
                this.haveObject$ = false;
          this.entryService.getAllEntriesByCardMain(card).pipe(takeUntil(this.onDestroy$))
          .subscribe(entries => this.entrySet = entries);
    
          this.entryService.getAllEntriesByCardOnSite(card).pipe(takeUntil(this.onDestroy$))
          .subscribe(entries => this.entryOnSiteSet = entries);
          });
        } else {
          this.insertCard = undefined;
          this.formSetUp();
          this.title = 'Vytvorenie karty klienta';
          this.readonly = false;
          this.haveObject$= true;
        }
      });
  }

  onClickBasicInfo () {
    this.basicInfo = !this.basicInfo;
  }

  onClickContactInfo () {
    this.contactInfo = !this.contactInfo;
  }

  onClickOtherInfo () {
    this.otherInfo = !this.otherInfo;
  }

  onClickWorkInfo () {
    this.workInfo = !this.workInfo;
  }

  onMakeEditable () {
    this.readonly = !this.readonly;
  }

formSetUp() {
  this.formGroup = this.buildForm(this.insertCard);
}

  buildForm(card?: CardBasicDTO) {
    const fb = this.formBuilder.nonNullable;
    return fb.group({
      id: fb.control<number | undefined>(card?.id),
      client_nick: fb.control(card?.client_nick ?? '', [Validators.required]),
      client_gender: fb.control(card?.client_gender ?? '', [Validators.required]),
      client_anamnesis: fb.control(card?.client_anamnesis ?? '', [Validators.required]),
      client_dev_plan: fb.control(card?.client_dev_plan ?? ''),
      client_age: fb.control(card?.client_age ?? ''),
      client_birth_year: fb.control(card?.client_birth_year ?? '', [Validators.required]),
      client_name: fb.control(card?.client_name ?? ''),
      client_surname: fb.control(card?.client_surname ?? ''),
      client_birth_date: fb.control(card?.client_birth_date ?? ''),
      client_family_status: fb.control(card?.client_family_status ?? ''),
      client_citizenship: fb.control(card?.client_citizenship ?? ''),
      client_address: fb.control(card?.client_address ?? ''),
      client_phone: fb.control(card?.client_phone ?? ''),
      client_email: fb.control(card?.client_email ?? ''),
      client_socnet: fb.control(card?.client_socnet ?? ''),
      client_health: fb.control(card?.client_health ?? ''),
      client_income: fb.control(card?.client_income ?? ''),
      client_belongings: fb.control(card?.client_belongings ?? ''),
      client_other_institutes: fb.control<InstitutionDTO | undefined>(card?.client_other_institutes),
    });
  }

  onSubmit(): void {
    const formGroup = this.formGroup;
    if (isNil(formGroup)) {
      return;
    }
    this.errorMessages = this.getFormValidationErrors(formGroup);

    if (formGroup.valid) {
      this.cardService.saveCard(this.createSaveObject(formGroup)).pipe(
        tap(() => {
          formGroup.markAsUntouched();
          formGroup.markAsPristine();
          if (isNil(this.insertCard)) {
            formGroup.reset();
          }
          this.onMakeEditable();
        }),takeUntil(this.onDestroy$))
        .subscribe(card => this.router.navigate([`/card_line/` + card.id]));
    }
  }

  createSaveObject(formGroup: CardForm): CardBasicDTO {
    return formGroup.getRawValue();
  }

  // funtion for comparing that is used in mat-select  that selected values what is object is set up correctly
  compareOptions(o1: InstitutionDTO | null, o2: InstitutionDTO | null): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  getFormValidationErrors(form: CardForm): string[] {
    const errors: string[] = [];
    Object.entries(form.controls).forEach(([key, control]) => {
      const controlErrors = control.errors;
      const keyTranslate = translateKey(key);
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorKey => {
          let errorMessage = '';
          switch (errorKey) {
            case 'required':
              errorMessage = `${keyTranslate} je povinné pole na vyplnenie.`;
              break;
          }
          errors.push(errorMessage);
        });
      }
    });
    return errors;
  }
}

function translateKey(key: string): string {
  let translate =''
  switch (key) {
    case 'client_nick':
      translate = `Klient`;
      break;
    case 'client_gender':
        translate = `Pohlavie`;
        break;
    case 'client_birth_year':
        translate = `Rok narodenia`;
        break;
    case 'client_anamnesis':
        translate = `Anamnéza`;
        break;
  }
  return translate;
}
