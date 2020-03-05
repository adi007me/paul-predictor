import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './team';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../services.constants';

@Injectable()
export class TeamsService {

  constructor(private http: HttpClient) {

  }

  getTeams() : Observable<Team[]>{
    return this.http.get<Team[]>(Constants.BASE_URL + '/teams');
  }

}
