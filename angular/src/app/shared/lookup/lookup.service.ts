import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { SettingService } from '../../setting/setting.service';
import { CampaignDTO } from '../../model/CampaignDTO';
import { CoworkerDTO } from '../../model/CoworkerDTO';
import { EventDTO } from '../../model/EventDTO';
import { InstitutionDTO } from '../../model/InstitutionDTO';
import { MethodsDTO } from '../../model/MethodsDTO';
import { ProgramDTO } from '../../model/ProgramDTO';

/**
 * Central place for select/dropdown option lists that come from the backend.
 * Each list is fetched once and shared (shareReplay(1)) so components across
 * the app can inject this service and get the same cached data instead of
 * each one re-requesting it.
 */
@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private campaigns$?: Observable<CampaignDTO[]>;
  private coworkers$?: Observable<CoworkerDTO[]>;
  private events$?: Observable<EventDTO[]>;
  private institutions$?: Observable<InstitutionDTO[]>;
  private methods$?: Observable<MethodsDTO[]>;
  private programs$?: Observable<ProgramDTO[]>;

  constructor(private settingService: SettingService) { }

  getCampaigns(): Observable<CampaignDTO[]> {
    if (!this.campaigns$) {
      this.campaigns$ = this.settingService.campaigns.getAll().pipe(shareReplay(1));
    }
    return this.campaigns$;
  }

  getCoworkers(): Observable<CoworkerDTO[]> {
    if (!this.coworkers$) {
      this.coworkers$ = this.settingService.coworkers.getAll().pipe(shareReplay(1));
    }
    return this.coworkers$;
  }

  getEvents(): Observable<EventDTO[]> {
    if (!this.events$) {
      this.events$ = this.settingService.events.getAll().pipe(shareReplay(1));
    }
    return this.events$;
  }

  getInstitutions(): Observable<InstitutionDTO[]> {
    if (!this.institutions$) {
      this.institutions$ = this.settingService.institutions.getAll().pipe(shareReplay(1));
    }
    return this.institutions$;
  }

  getMethods(): Observable<MethodsDTO[]> {
    if (!this.methods$) {
      this.methods$ = this.settingService.methods.getAll().pipe(shareReplay(1));
    }
    return this.methods$;
  }

  getPrograms(): Observable<ProgramDTO[]> {
    if (!this.programs$) {
      this.programs$ = this.settingService.programs.getAll().pipe(shareReplay(1));
    }
    return this.programs$;
  }
}
