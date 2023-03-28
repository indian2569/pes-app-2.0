import { Injectable } from '@angular/core';
import { ProgramDTO } from '../model/ProgramDTO';
import { MethodsDTO } from '../model/MethodsDTO';
import { CampaignDTO } from '../model/CampaignDTO';

import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';

import { take } from 'rxjs/operators';
import { CoworkerDTO } from '../model/CoworkerDTO';
import { CardBasicDTO } from '../model/CardBasicDTO';
import { SettingService } from '../setting/setting.service';
import { CardService } from '../card/card.service';
import { EntryDTO } from '../model/EntryDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  public static readonly ENTRY_API_URL = '/api/entry';
  programData: ProgramDTO[] = [];
  methodsData: MethodsDTO[] = [];
  campaignesData: CampaignDTO[] = [];
  coworkerData: CoworkerDTO[] = [];
  cardData: CardBasicDTO[] = [];

  constructor(protected http: HttpClient,
              private settingService: SettingService,
              private cardService: CardService) { }

  private CONTEXT = new HttpContext().set(new HttpContextToken(() => false), true);

  public getPrograms(): ProgramDTO[] {
    this.settingService.getAllPrograms()
    .pipe(take(1)).toPromise()
    .then(((program: any) => this.programData = program));
    return this.programData;
  }

  public getMethods(): MethodsDTO[] {
    this.settingService.getAllMethods().pipe(take(1)).toPromise()
    .then((methods: any) => this.methodsData = methods);
    return this.methodsData;
  }

  public getCampaignes(): CampaignDTO[] {
    this.settingService.getAllCampaigns().pipe(take(1)).toPromise()
    .then((campaigne: any) => this.campaignesData = campaigne);
    return this.campaignesData;
  }

  public saveEntry(entry: EntryDTO):  Observable<EntryDTO> {
    return this.http.post<EntryDTO>(EntryService.ENTRY_API_URL + '/save', entry, { context: this.CONTEXT });
  }

  public getEntry(code: string):  Observable<EntryDTO> {
    return this.http.get<EntryDTO>(EntryService.ENTRY_API_URL + '/' + `${code}`, { context: this.CONTEXT });
  }

  deleteEntry(code: string): Observable<EntryDTO> {
    return this.http.delete<EntryDTO>(EntryService.ENTRY_API_URL + '/' + `${code}`);
  }

  public getAllEntrys():  Observable<EntryDTO[]> {
    return this.http.get<EntryDTO[]>(EntryService.ENTRY_API_URL + '/allEntrys', { context: this.CONTEXT });
  }

  getContats(): CoworkerDTO[] {
    this.settingService.getAllCoworkers().pipe(take(1)).toPromise()
    .then((coworker: any) => this.coworkerData = coworker);
    return this.coworkerData;
  }

  getCards(): import("../model/CardBasicDTO").CardBasicDTO[] {
    this.cardService.getAllCards().pipe(take(1)).toPromise()
    .then((cardSub: any) => this.cardData = cardSub);
    return this.cardData;
  }
}
