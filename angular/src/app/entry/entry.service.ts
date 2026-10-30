import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
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
  yearfrom?: string | null;
  yearto?: string | null;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  public static readonly ENTRY_API_URL = `${environment.apiUrl}/api/entry`;

  constructor(protected http: HttpClient) { }


  public saveEntry(entry: EntryDTO):  Observable<EntryDTO> {
    return this.http.post<EntryDTO>(EntryService.ENTRY_API_URL + '/save', entry);
  }

  public getEntry(code: string | number):  Observable<EntryDTO> {
    return this.http.get<EntryDTO>(EntryService.ENTRY_API_URL + '/' + `${code}`);
  }

  deleteEntry(code: string | number): Observable<EntryDTO> {
    return this.http.delete<EntryDTO>(EntryService.ENTRY_API_URL + '/' + `${code}`);
  }

  public getAllEntrys(filter?: EntryFilterParams):  Observable<EntryPageDTO[]> {
    let params = new HttpParams();
    Object.entries(filter ?? {})
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
      .forEach(([key, value]) => params = params.set(key, String(value)));
    return this.http.get<EntryPageDTO[]>(EntryService.ENTRY_API_URL + '/allEntrys', { params });
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
