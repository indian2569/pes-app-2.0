import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { CardService } from '../card.service';
import { EntryService} from '../../entry/entry.service';
import { map, tap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { CardBasicDTO } from '../../model/CardBasicDTO';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  basicInfo = false;
  contactInfo = false;
  otherInfo = false;
  workInfo = false;
  insertCard: CardBasicDTO;
  formGroup: UntypedFormGroup;
  title: string;
  readonly: boolean;
  entrySet = [];
  entryOnSiteSet = [];
  
  onDestroy$ = new Subject();

  @Input() editId: string;

  constructor(private cardService: CardService,
			  private entryService: EntryService,
              private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.route.url
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params: any) => {
        if (params[0].path !== 'add_card' && params.length > 0) {
          this.editId = params[0].path;
        }
      });
    if (!_.isNil(this.editId)) {
      this.cardService.getCard(this.editId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(card => {
            this.insertCard = card;
            this.formSetUp();
            this.title = 'Karta klienta';
            this.readonly = true;
			this.entryService.getAllEntrysByCardMain(this.insertCard).pipe(takeUntil(this.onDestroy$))
			.subscribe(entrys => this.entrySet = entrys);

			this.entryService.getAllEntrysByCardOnSite(this.insertCard).pipe(takeUntil(this.onDestroy$))
			.subscribe(entrys => this.entryOnSiteSet = entrys);
      });
    } else {
      this.formSetUp();
      this.title = 'Vytvorenie karty klienta';
      this.readonly = false;
    }
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

formSetUp() {
  this.formGroup = this.formBuilder.group({
    id: new UntypedFormControl(_.isNil(this.insertCard) ? undefined : this.insertCard.id),
    client_nick: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_nick),
    client_gender: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_gender),
    client_anamnesis: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_anamnesis, [Validators.required]),
    client_dev_plan: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_dev_plan, [Validators.required]),
    clint_age: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.clint_age),
    client_birth_year: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_birth_year),
    client_name: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_name),
    client_surname: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_surname),
    client_birth_date: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_birth_date),
    client_family_status: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_family_status),
    client_citizenship: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_citizenship),
    client_address: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_address),
    client_phone: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_phone),
    client_email: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_email),
    client_socnet: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_socnet),
    client_health: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_health),
    client_income: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_income),
    client_belongings: new UntypedFormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_belongings),
    client_other_institutes: new UntypedFormControl(_.isNil(this.insertCard) ? [] : this.insertCard.client_other_institutes),
  });
}

  onSubmit(): void {
    this.cardService.saveCard(this.createSaveObject()).pipe(
      tap(() => {
        this.formGroup.markAsUntouched();
        this.formGroup.markAsPristine();
        this.formGroup.reset();
      }),takeUntil(this.onDestroy$))
      .subscribe(card => this.router.navigate([`/card/` + card.id]));
  }

  createSaveObject(): CardBasicDTO {
    const ret: CardBasicDTO = this.formGroup.getRawValue();
    return ret;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
