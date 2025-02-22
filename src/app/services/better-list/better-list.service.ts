import { Injectable } from '@angular/core';
import { Bets } from './bets';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../services.constants';
import { Observable } from 'rxjs';

@Injectable()
export class BetterListService {

  constructor(private http: HttpClient) { }

  getBetterList(matchId: String): Observable<Bets> {
    return this.http.get<Bets>(Constants.BASE_URL + '/matchbets/' + matchId, {withCredentials: true});
  }
}
