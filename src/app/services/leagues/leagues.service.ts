import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League } from './league';
import { Constants } from '../services.constants';
import { Match } from './match';
import { TeamsService } from '../teams/teams.service';
import { map } from 'rxjs/operators';

@Injectable()
export class LeaguesService {

  constructor(private http: HttpClient, private teams: TeamsService) { }

  getLeagues() : Observable<League[]>{
    return this.http.get<League[]>(Constants.BASE_URL + '/leagues');
  }

  getLeague() : Observable<League> {
    return new Observable<League>(observer => {
      console.log('Inside Subscribe');
      this.http.get<League[]>(Constants.BASE_URL + '/leagues').subscribe(leagues => {
        console.log(leagues);
        const league = leagues[0];

        let matches = league.matches;

        let currentTime = new Date();
        this.teams.getTeams().subscribe(teams => {
          matches.forEach(match => {
            match.team1 = teams.find(team => team.shortName === match.team1_id);
            match.team2 = teams.find(team => team.shortName === match.team2_id);

            let matchTimeAddHour = new Date(match.datetime);
            matchTimeAddHour.setHours(matchTimeAddHour.getHours() - 1);
            match.choiceChangeDisabled = (matchTimeAddHour < currentTime);
            match.sliderValue = 1;
          });

          league.currentBet = matches.filter(m => !m.result && m.choiceChangeDisabled);
          league.upcomingMatches = matches.filter(m => !m.result && !m.choiceChangeDisabled);
          league.completedMatches = matches.filter(m => m.result);
          league.recentMatches = matches.filter(m => m.result);
          league.recentMatches.sort(function(a, b){
            let dt1 = new Date(b.datetime);
            let dt2 = new Date(a.datetime);

            return (dt1 > dt2 ? 1 : -1);
          });
          league.recentMatches = league.recentMatches.slice(0, 3);

          observer.next(league);
        });
      });
    });
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
