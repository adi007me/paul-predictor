import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Team } from './team';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../services.constants';

@Injectable()
export class TeamsService {
  cachedTeams: Team[] = null;

  constructor(private http: HttpClient) {
    
  }

  getTeams() : Observable<Team[]>{
    if (this.cachedTeams && this.cachedTeams.length) {
      return of(this.cachedTeams);
    } else {
      return this.http.get<Team[]>(Constants.BASE_URL + '/teams').pipe(map(teams => {
        this.cachedTeams = teams;

        return teams;
      }));
    }
    
  }

}
