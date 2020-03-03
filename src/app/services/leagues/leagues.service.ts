import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League } from './league';
import { Constants } from '../services.constants';
import { Match } from './match';

@Injectable()
export class LeaguesService {

  constructor(private http: HttpClient) { }

  getLeagues() : Observable<League[]>{
    return this.http.get<League[]>(Constants.BASE_URL + 'leagues');
  }

  getSliderValue(match : Match) : Number {
    let sliderValue : Number = 1;
    if(match.choice === match.team1_id) {
      sliderValue = 0;
    } else if(match.choice === match.team2_id) {
      sliderValue = 2;
    }

    return sliderValue;
  }

  getChoiceValue(sliderValue : Number, match : Match) : String {
    let choice : String = 'draw';

    if(sliderValue === 0) {
      choice = match.team1_id;
    } else if(sliderValue === 2) {
      choice = match.team2_id;
    }

    return choice;
  }
}
