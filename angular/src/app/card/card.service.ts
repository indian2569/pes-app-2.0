import { Injectable } from '@angular/core';
import { HttpClient, HttpContextToken } from '@angular/common/http';
import { CardBasicDTO } from '../model/CardBasicDTO';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(protected http: HttpClient) { }
  public static readonly CARD_API_URL = 'http://localhost:8080/card';

  public saveCard(card: CardBasicDTO):  Observable<CardBasicDTO> {
    return this.http.post<CardBasicDTO>(CardService.CARD_API_URL + '/save', card);
  }

  public getCard(code: string):  Observable<CardBasicDTO> {
    return this.http.get<CardBasicDTO>(CardService.CARD_API_URL + '/' + `${code}`);
  }

  public deleteCard(code: string): Observable<CardBasicDTO> {
    return this.http.delete<CardBasicDTO>(CardService.CARD_API_URL + '/' + `${code}`);
  }

  public getAllCards(): Observable<CardBasicDTO[]> {
    return this.http.get<CardBasicDTO[]>(CardService.CARD_API_URL + '/allCards');
  }
}
