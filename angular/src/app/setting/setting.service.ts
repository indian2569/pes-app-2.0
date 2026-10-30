import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CampaignDTO } from '../model/CampaignDTO';
import { EventDTO } from '../model/EventDTO';
import { InstitutionDTO } from '../model/InstitutionDTO';
import { CoworkerDTO } from '../model/CoworkerDTO';
import { MethodsDTO } from '../model/MethodsDTO';
import { ProgramDTO } from '../model/ProgramDTO';
import { CrudService } from '../shared/crud/crud.service';

const API_URL = `${environment.apiUrl}/api`;

/** Setting lists, keyed by the type numbers used by <app-table [typeNumber]> and the dialog. */
export enum SettingType {
  INSTITUTION = 1,
  CAMPAIGN = 2,
  METHOD = 3,
  PROGRAM = 4,
  COWORKER = 5,
  EVENT = 6
}

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  readonly campaigns: CrudService<CampaignDTO>;
  readonly coworkers: CrudService<CoworkerDTO>;
  readonly events: CrudService<EventDTO>;
  readonly institutions: CrudService<InstitutionDTO>;
  readonly methods: CrudService<MethodsDTO>;
  readonly programs: CrudService<ProgramDTO>;

  constructor(http: HttpClient) {
    this.campaigns = new CrudService<CampaignDTO>(http, `${API_URL}/campaign`, 'allCampaigns');
    this.coworkers = new CrudService<CoworkerDTO>(http, `${API_URL}/coworker`, 'allCoworkers');
    this.events = new CrudService<EventDTO>(http, `${API_URL}/event`, 'allEvents');
    this.institutions = new CrudService<InstitutionDTO>(http, `${API_URL}/institution`, 'allInstitutions');
    this.methods = new CrudService<MethodsDTO>(http, `${API_URL}/method`, 'allMethods');
    this.programs = new CrudService<ProgramDTO>(http, `${API_URL}/program`, 'allPrograms');
  }

  /** The CRUD service of a setting list by its type number, undefined for an unknown type. */
  forType(type: number): CrudService<CoworkerDTO> | undefined {
    switch (type) {
      case SettingType.INSTITUTION: return this.institutions;
      case SettingType.CAMPAIGN: return this.campaigns;
      case SettingType.METHOD: return this.methods;
      case SettingType.PROGRAM: return this.programs;
      case SettingType.COWORKER: return this.coworkers;
      case SettingType.EVENT: return this.events;
      default: return undefined;
    }
  }
}
