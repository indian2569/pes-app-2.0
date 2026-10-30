import { Injectable } from '@angular/core';

import { HttpClient, HttpContext, HttpContextToken, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { CardBasicDTO } from '../model/CardBasicDTO';
import { EntryDTO } from '../model/EntryDTO';
import { EntryPageDTO } from '../model/EntryPageDTO';
import { Observable } from 'rxjs';

/** Query parameters supported by GET /api/entry/allEntrys (see pes.yaml). */
export interface EntryFilterParams {
  page_size?: number;
  page_number?: number;
  sort?: string;
  place?: string;
  campaign?: string;
  program?: string;
  yearfrom?: string;
  yearto?: string;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  public static readonly ENTRY_API_URL = `${environment.apiUrl}/api/entry`;

  constructor(protected http: HttpClient) { }

  private CONTEXT = new HttpContext().set(new HttpContextToken(() => false), true);

  public saveEntry(entry: EntryDTO):  Observable<EntryDTO> {
    return this.http.post<EntryDTO>(EntryService.ENTRY_API_URL + '/save', entry, { context: this.CONTEXT });
  }

  public getEntry(code: string):  Observable<EntryDTO> {
    return this.http.get<EntryDTO>(EntryService.ENTRY_API_URL + '/' + `${code}`, { context: this.CONTEXT });
  }

  deleteEntry(code: string): Observable<EntryDTO> {
    return this.http.delete<EntryDTO>(EntryService.ENTRY_API_URL + '/' + `${code}`);
  }

  public getAllEntrys(filter?: EntryFilterParams):  Observable<EntryPageDTO[]> {
    let params = new HttpParams();
    Object.entries(filter ?? {})
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
      .forEach(([key, value]) => params = params.set(key, String(value)));
    return this.http.get<EntryPageDTO[]>(EntryService.ENTRY_API_URL + '/allEntrys', { params, context: this.CONTEXT });
  }

  public getAllEntrysByCardMain(card: CardBasicDTO):  Observable<EntryDTO[]> {
    return this.http.post<EntryDTO[]>(EntryService.ENTRY_API_URL + '/allCardEntrysMain', card);
  }

  public getAllEntrysByCardOnSite(card: CardBasicDTO):  Observable<EntryDTO[]> {
    return this.http.post<EntryDTO[]>(EntryService.ENTRY_API_URL + '/allCardEntrysOnSite', card);
  }

  public getAllEntrysByCard():  Observable<EntryDTO[]> {
    return this.http.get<EntryDTO[]>(EntryService.ENTRY_API_URL + '/getListNewEntrys');
  }
}
