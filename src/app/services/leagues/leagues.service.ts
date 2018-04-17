import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { League } from './league';
import { Constants } from '../services.constants';

@Injectable()
export class LeaguesService {

  constructor(private http: HttpClient) { }

  getLeagues() : Observable<League[]>{
    return this.http.get<League[]>(Constants.BASE_URL + 'leagues');
  }
}
