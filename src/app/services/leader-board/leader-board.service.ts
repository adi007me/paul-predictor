import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaderBoard } from './leader-board';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../services.constants';

@Injectable()
export class LeaderBoardService {

  constructor(private http: HttpClient) { }

  getLeaderBoard() : Observable<LeaderBoard[]> {
    return this.http.get<LeaderBoard[]>(Constants.BASE_URL + '/leaderboard', {withCredentials: true});
  }
}
