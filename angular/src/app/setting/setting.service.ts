import { Injectable } from '@angular/core';
import { HttpContext, HttpContextToken, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CampaignDTO } from '../model/CampaignDTO';
import { EventDTO } from '../model/EventDTO';
import { InstitutionDTO } from '../model/InstitutionDTO';
import { CoworkerDTO } from '../model/CoworkerDTO';
import { MethodsDTO } from '../model/MethodsDTO';
import { ProgramDTO } from '../model/ProgramDTO';


@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public static readonly CAMAPAIGNE_API_URL = 'http://localhost:8080/campaign';
  public static readonly COWORKERS_API_URL = 'http://localhost:8080/coworker';
  public static readonly EVENTS_API_URL = 'http://localhost:8080/event';
  public static readonly INSTITUTION_API_URL = 'http://localhost:8080/institution';
  public static readonly METHODS_API_URL = 'http://localhost:8080/method';
  public static readonly PROGRAMS_API_URL = 'http://localhost:8080/program';

  private CONTEXT = new HttpContext().set(new HttpContextToken(() => false), true);

  constructor(protected http: HttpClient) { }
  /**Campaigne call for services */
  public saveCampaign(entry: CampaignDTO):  Observable<CampaignDTO> {
    return this.http.post<CampaignDTO>(SettingService.CAMAPAIGNE_API_URL + '/save', entry);
  }

  public getCampaign(code: string):  Observable<CampaignDTO> {
    return this.http.get<CampaignDTO>(SettingService.CAMAPAIGNE_API_URL + `${code}`);
  }

  public deleteCampaign(code: string): Observable<CampaignDTO> {
    return this.http.delete<CampaignDTO>(SettingService.CAMAPAIGNE_API_URL + `/${code}`);
  }

  public getAllCampaigns():  Observable<CampaignDTO[]> {
    const headersSet = new HttpHeaders();
    return this.http.get<CampaignDTO[]>(SettingService.CAMAPAIGNE_API_URL + '/allCampaigns', { headers: headersSet});
  }

  /** Events call for services*/
  public saveEvent(entry: EventDTO):  Observable<EventDTO> {
    return this.http.post<EventDTO>(SettingService.EVENTS_API_URL + '/save', entry, { context: this.CONTEXT });
  }

  public getEvent(code: string):  Observable<EventDTO> {
    return this.http.get<EventDTO>(SettingService.EVENTS_API_URL + `/${code}`, { context: this.CONTEXT });
  }

  public deleteEvent(code: string): Observable<EventDTO> {
    return this.http.delete<EventDTO>(SettingService.EVENTS_API_URL + `/${code}`);
  }

  public getAllEvents():  Observable<EventDTO[]> {
    return this.http.get<EventDTO[]>(SettingService.EVENTS_API_URL + '/allEvents', { context: this.CONTEXT });
  }

  /**Institution call for services  */
  public saveInstitution(entry: InstitutionDTO):  Observable<InstitutionDTO> {
    return this.http.post<InstitutionDTO>(SettingService.INSTITUTION_API_URL + '/save', entry, { context: this.CONTEXT });
  }

  public getInstitution(code: string): Observable<InstitutionDTO> {
    return this.http.get<InstitutionDTO>(SettingService.INSTITUTION_API_URL + `/${code}`, { context: this.CONTEXT });
  }

  public deleteInstitution(code: string): Observable<InstitutionDTO> {
    return this.http.delete<InstitutionDTO>(SettingService.INSTITUTION_API_URL + `/${code}`);
  }

  public getAllInstitutions(): Observable<InstitutionDTO[]> {
    return this.http.get<InstitutionDTO[]>(`${SettingService.INSTITUTION_API_URL}/allInstitutions`, { context: this.CONTEXT });
  }

  /** Coworkers call for services */
  public saveCoworker(entry: CoworkerDTO):  Observable<CoworkerDTO> {
    return this.http.post<CoworkerDTO>(`${SettingService.COWORKERS_API_URL}/save`, entry, { context: this.CONTEXT });
  }

  public getCoworker(code: string): Observable<CoworkerDTO> {
    return this.http.get<CoworkerDTO>(SettingService.COWORKERS_API_URL + '/' + `${code}`, { context: this.CONTEXT });
  }

  public deleteCoworker(code: string): Observable<CoworkerDTO> {
    return this.http.delete<CoworkerDTO>(SettingService.COWORKERS_API_URL + '/' + `${code}`);
  }

  public getAllCoworkers(): Observable<CoworkerDTO[]> {
    return this.http.get<CoworkerDTO[]>(`${SettingService.COWORKERS_API_URL}/allCoworkers`);
  }

  /** Methods call for services */
  public saveMethod(entry: MethodsDTO):  Observable<MethodsDTO> {
    return this.http.post<MethodsDTO>(`${SettingService.METHODS_API_URL}/save`, entry);
  }

  public getMethod(code: string): Observable<MethodsDTO> {
    return this.http.get<MethodsDTO>(SettingService.METHODS_API_URL + '/' + `${code}`, { context: this.CONTEXT });
  }

  public deleteMethod(code: string): Observable<MethodsDTO> {
    return this.http.delete<MethodsDTO>(SettingService.METHODS_API_URL + '/' + `${code}`);
  }

  public getAllMethods(): Observable<MethodsDTO[]> {
    return this.http.get<MethodsDTO[]>(`${SettingService.METHODS_API_URL}/allMethods`);
  }

  /** Programs call for services */
  public saveProgram(entry: ProgramDTO):  Observable<ProgramDTO> {
    return this.http.post<ProgramDTO>(SettingService.PROGRAMS_API_URL + '/save', entry, { context: this.CONTEXT });
  }

  public getProgram(code: string): Observable<ProgramDTO> {
    return this.http.get<ProgramDTO>(SettingService.PROGRAMS_API_URL + `/${code}`, { context: this.CONTEXT });
  }

  public deleteProgram(code: string): Observable<ProgramDTO> {
    return this.http.delete<ProgramDTO>(SettingService.PROGRAMS_API_URL + `/${code}`);
  }

  public getAllPrograms(): Observable<ProgramDTO[]> {
    return this.http.get<ProgramDTO[]>(SettingService.PROGRAMS_API_URL + '/allPrograms', { context: this.CONTEXT });
  }
}
