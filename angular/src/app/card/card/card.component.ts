import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CardService } from '../card.service';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { CardBasicDTO } from '../../model/CardBasicDTO';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  basicInfo = false;
  contactInfo = false;
  otherInfo = false;
  workInfo = false;
  insertCard: CardBasicDTO;
  formGroup: FormGroup;
  title: string;
  readonly: boolean;
  entrySet = [];

  @Input() editId: string;

  constructor(private cardService: CardService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.route.url
      .subscribe((params: any) => {
        if (params[0].path !== 'add_card' && params.length > 0) {
          this.editId = params[0].path;
        }
      });
    if (!_.isNil(this.editId)) {
      this.cardService.getCard(this.editId).subscribe(card => {
        this.insertCard = card;
        this.formSetUp();
        this.title = 'Karta klienta';
        this.readonly = true;
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
    id: new FormControl(_.isNil(this.insertCard) ? undefined : this.insertCard.id),
    client_nick: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_nick),
    client_gender: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_gender),
    client_anamnesis: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_anamnesis, [Validators.required]),
    client_dev_plan: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_dev_plan, [Validators.required]),
    clint_age: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.clint_age),
    client_birth_year: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_birth_year),
    client_name: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_name),
    client_surname: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_surname),
    client_birth_date: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_birth_date),
    client_family_status: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_family_status),
    client_citizenship: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_citizenship),
    client_address: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_address),
    client_phone: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_phone),
    client_email: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_email),
    client_socnet: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_socnet),
    client_health: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_health),
    client_income: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_income),
    client_belongings: new FormControl(_.isNil(this.insertCard) ? '' : this.insertCard.client_belongings),
    client_other_institutes: new FormControl(_.isNil(this.insertCard) ? [] : this.insertCard.client_other_institutes),
  });
}

  onSubmit(): void {
    this.cardService.saveCard(this.createSaveObject()).pipe(
      tap(() => {
        this.formGroup.markAsUntouched();
        this.formGroup.markAsPristine();
        this.formGroup.reset();
      }))
      .subscribe(card => this.router.navigate([`/card/` + card.id]));
  }

  createSaveObject(): CardBasicDTO {
    const ret: CardBasicDTO = this.formGroup.getRawValue();
    return ret;
  }
}
