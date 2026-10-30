import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CardBasicDTO } from '../model/CardBasicDTO';
import { Observable } from 'rxjs';
import { CardPageDTO } from '../model/CardPageDTO';
import { environment } from '../../environments/environment';

/** Query parameters supported by GET /api/card/allCards (see pes.yaml). */
export interface CardFilterParams {
  page_size?: number;
  page_number?: number;
  sort?: string;
  name?: string;
  gender?: string;
  yearfrom?: string | number | null;
  yearto?: string | number | null;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(protected http: HttpClient) { }
  public static readonly CARD_API_URL = `${environment.apiUrl}/api/card`;

  public saveCard(card: CardBasicDTO):  Observable<CardBasicDTO> {
    return this.http.post<CardBasicDTO>(CardService.CARD_API_URL + '/save', card);
  }

  public getCard(code: string | number):  Observable<CardBasicDTO> {
    return this.http.get<CardBasicDTO>(CardService.CARD_API_URL + '/' + `${code}`);
  }

  public deleteCard(code: string | number): Observable<CardBasicDTO> {
    return this.http.delete<CardBasicDTO>(CardService.CARD_API_URL + '/' + `${code}`);
  }

  public getAllCards(filter?: CardFilterParams): Observable<CardPageDTO[]> {
    let params = new HttpParams();
    Object.entries(filter ?? {})
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
      .forEach(([key, value]) => params = params.set(key, String(value)));
    return this.http.get<CardPageDTO[]>(CardService.CARD_API_URL + '/allCards', { params });
  }

  public togleActivateCards(code: string | number): Observable<CardBasicDTO> {
    return this.http.get<CardBasicDTO>(CardService.CARD_API_URL + '/activate/' + `${code}`);
  }
}
